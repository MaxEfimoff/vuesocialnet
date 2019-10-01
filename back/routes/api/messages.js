const express = require("express");
const router = express.Router();
const passport = require("passport");

// Message model
const Message = require("../../db/models/Message");

// Profile model
const Profile = require("../../db/models/Profile");

// Validation
const validateMessageInput = require("../../validation/message");

//@route      GET api/Messages
//@desc       Get Message
//@access     Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Message.find()
        .sort({ date: -1 })
        .then(messages =>
          res.json(
            messages.filter(
              message =>
                message.user.toString() === req.user.id ||
                message.recipient.toString() === req.user.name
            )
          )
        )
        .catch(err =>
          res.status(404).json({ nomessagefound: "No messages found" })
        );
    });
  }
);

//@route      GET api/messages/:id
//@desc       Get message by id
//@access     Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id, recipient: req.user.name }).then(
      profile => {
        Message.findById(req.params.id)
          .then(message => {
            //  Check for message owner or recipient
            if (
              message.user.toString() === req.user.id ||
              message.recipient.toString() === req.user.name
            ) {
              res.json(message);
            }
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          })
          .catch(err =>
            res
              .status(404)
              .json({ nomessagefound: "No message found with this id" })
          );
      }
    );
  }
);

//@route      POST api/messages
//@desc       Create message
//@access     Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newMessage = new Message({
      text: req.body.text,
      name: req.body.name,
      recipient: req.body.recipient,
      // avatar: req.body.avatar,
      user: req.user.id
    });
    newMessage.save().then(message => res.json(message));
  }
);

//@route      DELETE api/messages/:id
//@desc       Delete message by id
//@access     Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Message.findById(req.params.id)
        .then(message => {

          // Check for message owner
          if (message.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          // Delete
          message.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ messagenotfound: "No message found" })
        );
    });
  }
);

//@route      POST api/messages/like/:id
//@desc       Like message
//@access     Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Message.findById(req.params.id)
        .then(message => {
          if (
            message.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this message" });
          }
          // Add user ID to likes array
          message.likes.unshift({ user: req.user.id });
          message.save().then(message => res.json(message));
        })
        .catch(err =>
          res.status(404).json({ messagenotfound: "No message found" })
        );
    });
  }
);

//@route      POST api/messages/unlike/:id
//@desc       Unlike message
//@access     Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Message.findById(req.params.id)
        .then(message => {
          if (
            message.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this message" });
          }
          // Get the remove index
          const removeindex = message.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          message.likes.splice(removeindex, 1);

          // Save
          message.save().then(message => res.json(message));
        })
        .catch(err =>
          res.status(404).json({ messagenotfound: "No message found" })
        );
    });
  }
);

//@route      POST api/messages/comment/:id
//@desc       Add a comment message
//@access     Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Message.findById(req.params.id)
      .then(message => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          recipient: req.body.recipient,
          avatar: req.body.avatar,
          user: req.user.id
        };
        // Add to comments array
        message.comments.push(newComment);

        // Save
        message.save().then(message => res.json(message));
      })
      .catch(err =>
        res.status(404).json({ messagenotfound: "No message found" })
      );
  }
);

//@route      DELETE api/messages/comment/:id/:comment_id
//@desc       Delete a comment from message
//@access     Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.findById(req.params.id)
      .then(message => {

        // Check to see if the comment exists
        if (
          message.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = message.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        message.comments.splice(removeIndex, 1);
        message.save().then(message => res.json(message));
      })
      .catch(err =>
        res.status(404).json({ messagenotfound: "No message found" })
      );
  }
);

module.exports = router;
