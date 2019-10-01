const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../db/models/Post');
// Profile model
const Profile = require('../../db/models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// Shortened for /api/posts/test
router.get('/test', (req, res) => res.json({msg:'posts works'}));

//@route      GET api/posts/
//@desc       Get posts
//@access     Private
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
  Post
    .find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
})

//@route      GET api/my-posts/
//@desc       Get my posts
//@access     Private
router.get('/my-posts', passport.authenticate("jwt", { session: false }), (req, res) => {
  Post
    .find()
    .sort({date: -1})
    .then(posts =>
      res.json(posts.filter(post => post.user.toString() === req.user.id))
    )
    .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
})

//@route      GET api/posts/:id
//@desc       Get post by id
//@access     Private
router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Post
    .findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'No post found with that Id'}));
})

//@route      POST api/posts/
//@desc       Create post
//@access     Private
router.post('/', passport.authenticate("jwt", { session: false }), (req, res) => {
  const {errors, isValid} = validatePostInput(req.body);

  // Check Validation
  if(!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save()
    .then(post => res.json(post));
});

//@route      DELETE api/posts/:id
//@desc       Delete post by id
//@access     Private
router.delete('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check if current user is the post owner
          if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthorized: 'User not authorized' })
          }

          // Delete post
          post.remove().then(() => res.json({ success: true }));
        }).catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
   })
});

//@route      POST api/posts/like/:id
//@desc       Like post
//@access     Private
router.post('/like/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check if user already liked this post
          // Loops through likes array and checks if user id is there
          // If req.params.id is in the post.likes array, filtered array length will be > 0
          if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this post' })
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save()
            .then(post => res.json(post));
          
        }).catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
   })
});

//@route      POST api/posts/unlike/:id
//@desc       Unike post
//@access     Private
router.post('/unlike/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not yet liked this post' })
          }

          // Get the remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
          
        }).catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
   })
});

//@route      POST api/posts/comment/:id
//@desc       Add a comment post
//@access     Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

//@route      DELETE api/posts/comment/:id/:comment_id
//@desc       Delete a comment from post
//@access     Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {

        //Check to see if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

//@route      GET api/posts
//@desc       Show user's posts
//@access     Private
router.get('/handle/:handle/', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
    Post.find()
      .sort({ date: -1 })
      .then(posts =>
        res.json(posts.filter(post => post.user.toString() === profile.user._id.toString()))
      )
      .catch(err =>
        res.status(404).json({ nophotofound: "No posts found" })
      );
    });
  }
);

module.exports = router;