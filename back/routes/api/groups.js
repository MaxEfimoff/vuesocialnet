const express = require("express");
const router = express.Router();
const passport = require("passport");

//Group model
const Group = require("../../db/models/Group");

//Profile model
const Profile = require("../../db/models/Profile");

//Validation
const validateGroupInput = require("../../validation/group");
const validatePostInput = require("../../validation/post");

//route       GET api/groups/test
//desc        Tests Message route
//access      Public
router.get("/test", (req, res) => res.json({ msg: "Groups work" }));

//route       GET api/groups
//desc        Get Group
//access      Private
router.get(
  "/", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
  Group.find()
    .sort({ date: -1 })
    .then(groups => res.json(groups))
    .catch(err => res.status(404).json({ nogroupfound: "No groups found" }));
});

//@route      GET api/my-groups/
//@desc       Get my groups
//@access     Private
router.get('/my-groups', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Group
      .find()
      .sort({date: -1})
      .then(groups =>
        res.json(groups.filter(group => 
          group.subscribes
          .map(a => a.handle)
          .includes(profile.handle)
        ))
      )
      .catch(err => res.status(404).json({nogroupsfound: 'No groups found'}));
  });
})

//@route      GET api/manage-groups/
//@desc       Get manage groups
//@access     Private
router.get('/manage-groups', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
  Group
    .find()
    .sort({date: -1})
    .then(groups =>
      res.json(groups.filter(group => 
        group.name.toString() === profile.handle
      ))
    )
    .catch(err => res.status(404).json({nogroupsfound: 'No groups found'}));
  });
})

//route       GET api/groups/:id
//desc        Get group by id
//access      Private
router.get(
  "/:id", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
  Group.findById(req.params.id)
    .then(group => res.json(group))
    .catch(err =>
      res.status(404).json({ nogroupfound: "No group found with this id" })
    );
});

//route       POST api/groups
//desc        Create group
//access      Private
router.post(
  "/create-group",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGroupInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const groupFields = {};
    if (req.body.name) groupFields.name = req.body.name;
    if (req.body.handle) groupFields.handle = req.body.handle;
    if (req.body.status) groupFields.status = req.body.status;
    if (req.body.info) groupFields.info = req.body.info;
    if (req.body.avatar) groupFields.avatar = req.body.avatar;
    if (req.body.creatorAvatar) groupFields.creatorAvatar = req.body.creatorAvatar;
    if (req.body.profile) groupFields.profile = req.body.profile;
    if (req.body.background) groupFields.background = req.body.background;

    // Check if handle exists
    Group.findOne({ handle: groupFields.handle }).then(group => {
      if (group) {
        errors.handle = "That handle already exists";
        res.status(400).json(errors);
      }

      // Save group
      new Group(groupFields).save().then(group => res.json(group));
    });
  }
);

//route       PATCH api/groups
//desc        Update group
//access      Private
router.patch(
  "/:id/update-group",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGroupInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const groupFields = {};
    if (req.body.name) groupFields.name = req.body.name;
    if (req.body.handle) groupFields.handle = req.body.handle;
    if (req.body.status) groupFields.status = req.body.status;
    if (req.body.info) groupFields.info = req.body.info;
    if (req.body.avatar) groupFields.avatar = req.body.avatar;
    if (req.body.creatorAvatar) groupFields.creatorAvatar = req.body.creatorAvatar;
    if (req.body.profile) groupFields.profile = req.body.profile;
    if (req.body.background) groupFields.background = req.body.background;

    Group.findById(req.params.id)
    .then(group => {
      group.set(groupFields)
      group.save()
      .then(group => 
        res.json(group)
        );
    })
});

//route       DELETE api/groups/:id
//desc        Delete group by id
//access      Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Group.findById(req.params.id)
        .then(group => {
          //  Check for group owner
          if (group.user.toString() !== req.profile.handle) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //  Delete group
          group.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ groupnotfound: "No group found" })
        );
    });
  }
);

//route       POST api/groups/subscribe/:id
//desc        Subscribe to group
//access      Private
router.post(
  "/subscribe/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Group.findById(req.params.id)
        .then(group => {
          if (
            group.subscribes.filter(
              subscribe => subscribe.handle.toString() === profile.handle
            ).length > 0
          ) {
            return res.status(400).json({
              alreadysubscribed: "User is already subscribed to this group"
            });
          }
          // Add user ID to subscribers array
          console.log(profile)
          group.subscribes.unshift({ 
            // profile: profile._id
            handle: profile.handle,
            avatar: profile.avatar
          });
          group.save().then(group => res.json(group));
        })
        .catch(err =>
          res.status(404).json({ groupnotfound: "No group found" })
        );
    });
  }
);

//route       POST api/groups/unsubscribe/:id
//desc        Unsubscribe group
//access      Private
router.post(
  "/unsubscribe/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Group.findById(req.params.id)
        .then(group => {
          if (
            group.subscribes.filter(
              subscribe => subscribe.handle.toString() === profile.handle
            ).length === 0
          ) {
            return res.status(400).json({
              notsubscribed: "You have not yet subscribed this group"
            });
          }
          //  Get the remove index
          const removeindex = group.subscribes
            .map(item => item.handle.toString())
            .indexOf(profile.handle);

          //  Splice out of array
          group.subscribes.splice(removeindex, 1);

          // //  Save
          group.save().then(group => res.json(group));
        })
        .catch(err =>
          res.status(404).json({ groupnotfound: "No group found" })
        );
    });
  }
);

//route       POST api/groups/post/:id
//desc        Create new post
//access      Private
router.post(
  "/:id/post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Group.findById(req.params.id)
    .then(group => {
        const newPost = {
          text: req.body.text,
          avatar: profile.avatar,
          name: profile.handle
        };

        // Add to posts array
        group.posts.unshift(newPost);

        //Save
        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json({ groupnotfound: "No group found" }));
    });
  }
);

//route       PATCH api/groups/:id/post/:id
//desc        Update post
//access      Private
router.patch(
  "/:groupid/post/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    let newText = req.body.text;

    Group.findOne({ group: req.params._groupid })
    .then(group => {
       let mappedPost = group.posts.findIndex(a => 
        a._id == req.params.id
      )
      group.posts[mappedPost].text = newText;

      group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json({ groupnotfound: "No group found" }));
  }
);


//route       GET api/groups/:id
//desc        Get group post by id
//access      Private
router.get(
  "/:id/posts/:post_id", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
  Group.findById(req.params.id)
    .then(group => 
      {
        // Check to see if the post exists
        if (
          group.posts.filter(
            post => post._id.toString() === req.params.post_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ postnotexists: "Post does not exist" });
        }
        // Get post index
        const postIndex = group.posts
          .map(item => item._id.toString())
          .indexOf(req.params.post_id);

        res.json(group.posts[postIndex]);
      })
    .catch(err =>
      res.status(404).json({ nogroupfound: "No group found with this id" })
    );
});

//@route      POST api/groups/:id/post/:post_id
//@desc       Like post
//@access     Private
router.post('/:id/posts/:post_id', 
  passport.authenticate("jwt", { session: false }), (req, res) => {
  // Profile.findOne({ user: req.user.id })
  //   .then(profile => {
      Group.findById(req.params.id)
        .then(group => {
          const postIndex = group.posts
          .map(item => item._id.toString())
          .indexOf(req.params.post_id);

          const grouppost = group.posts[postIndex];

          // Check if user already liked this group post
          // Loops through likes array and checks if user id is there
          // If req.params.id is in the grouppost.likes array, filtered array length will be > 0
          if(grouppost.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this grouppost' })
          }

          // Add user id to likes array
          grouppost.likes.unshift({ user: req.user.id });

          group.save()
            .then(group => res.json(grouppost));
          
        }).catch(err => res.status(404).json({ grouppostnotfound: 'Post not found' }));
  //  })
});

//@route      POST api/groups/:id/Comments/:post_id
//@desc       Comment post
//@access     Private
router.post('/:id/comments/:post_id', 
  passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Group.findById(req.params.id)
        .then(group => {
          const postIndex = group.posts
          .map(item => item._id.toString())
          .indexOf(req.params.post_id);

          const grouppost = group.posts[postIndex];

          const newComment = {
            text: req.body.text,
            avatar: profile.avatar,
            profile: profile.handle
          };
          
          grouppost.comments.push(newComment);

          group.save()
            .then(group => res.json(grouppost));
          
        }).catch(err => res.status(404).json({ grouppostnotfound: 'Post not found' }));
   })
});

//route       DELETE api/groups/comment/:id/:comment_id
//desc        Delete a comment from group
//access      Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Group.findById(req.params.id)
      .then(group => {
        //Check to see if the comment exists
        if (
          group.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }
        //Get remove index
        const removeIndex = group.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice comment out of array
        group.comments.splice(removeIndex, 1);
        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json({ groupnotfound: "No group found" }));
  }
);

//@route      GET api/groups
//@desc       Show user's groups
//@access     Private
router.get('/handle/:handle/', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
    Group.find()
      .sort({ date: -1 })
      .then(groups =>
        res.json(groups.filter(group => 
          group.subscribes.map(a => a.user).includes(profile.handle).toString()))
      )
      .catch(err =>
        res.status(404).json({ nophotofound: "No groups found" })
      );
    });
  }
);

module.exports = router;
