const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Group model
const Group = require("../../db/models/Group");

//Profile model
const Profile = require("../../db/models/Profile");

//Validation
const validateGroupInput = require("../../validation/group");

//route GET api/group/test
//desc  Tests Message route
//access Public
router.get("/test", (req, res) => res.json({ msg: "Groups work" }));

//route GET api/Groups
//desc  Get Group
//access Public
router.get("/", (req, res) => {
  Group.find()
    .sort({ date: -1 })
    .then(groups => res.json(groups))
    .catch(err => res.status(404).json({ nogroupfound: "No groups found" }));
});

//route GET api/groups/:id
//desc  Get group by id
//access Public
router.get("/:id", (req, res) => {
  Group.findById(req.params.id)
    .then(group => res.json(group))
    .catch(err =>
      res.status(404).json({ nogroupfound: "No group found with this id" })
    );
});

//route POST api/group
//desc  Create or edit  group
//access Private
router.post(
  "/create-group",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGroupInput(req.body);

    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const groupFields = {};
    groupFields.user = req.user.id;
    if (req.body.handle) groupFields.handle = req.body.handle;
    if (req.body.status) groupFields.status = req.body.status;
    if (req.body.info) groupFields.info = req.body.info;
    if (req.body.location) groupFields.location = req.body.location;

    //check  if handle exists
    Group.findOne({ handle: groupFields.handle }).then(group => {
      if (group) {
        errors.handle = "That handle already exists";
        res.status(400).json(errors);
      }

      //save group
      new Group(groupFields).save().then(group => res.json(group));
    });
  }
);

//route DELETE api/groups/:id
//desc  Delete group by id
//access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Group.findById(req.params.id)
        .then(group => {
          //Check for group owner
          if (group.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Delete group
          group.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ groupnotfound: "No group found" })
        );
    });
  }
);

//route group api/groups/subscribe/:id
//desc  subscribe group
//access Private
router.post(
  "/subscribe/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Group.findById(req.params.id)
        .then(group => {
          if (
            group.subscribes.filter(
              subscribe => subscribe.user.toString() === req.user.id
            ).length > 0
          ) {
            return res.status(400).json({
              alreadysubscribed: "User is already subscribed to this group"
            });
          }
          //Add user ID to subscribes array
          group.subscribes.unshift({ user: req.user.id });
          group.save().then(group => res.json(group));
        })
        .catch(err =>
          res.status(404).json({ groupnotfound: "No group found" })
        );
    });
  }
);

//route group api/groups/unsubscribe/:id
//desc  Unsubscribe group
//access Private
router.post(
  "/unsubscribe/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Group.findById(req.params.id)
        .then(group => {
          if (
            group.subscribes.filter(
              subscribe => subscribe.user.toString() === req.user.id
            ).length === 0
          ) {
            return res.status(400).json({
              notsubscribed: "You have not yet subscribed this group"
            });
          }
          //Get the remove index
          const removeindex = group.subscribes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice out of array
          group.subscribes.splice(removeindex, 1);

          //Save
          group.save().then(group => res.json(group));
        })
        .catch(err =>
          res.status(404).json({ groupnotfound: "No group found" })
        );
    });
  }
);

//route group api/groups/comment/:id
//desc  Add a comment group
//access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGroupInput(req.body);

    // Check validation
    if (!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Group.findById(req.params.id)
      .then(group => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        //Add to comments array
        group.comments.unshift(newComment);

        //Save
        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(404).json({ groupnotfound: "No group found" }));
  }
);

//route DELETE api/groups/comment/:id/:comment_id
//desc  Delete a comment from group
//access Private
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

module.exports = router;
