const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Note model
const Note = require('../../db/models/Note');

// Profile model
const Profile = require("../../db/models/Profile");

// Validation
const validateNoteInput = require("../../validation/note");

//@route      GET api/notes
//@desc       Get note
//@access     Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Note.find()
        .sort({ date: -1 })
        .then(notes =>
          res.json(notes.filter(note => note.user.toString() === req.user.id))
        )
        .catch(err =>
          res.status(404).json({ nonotefound: "No notes found" })
        );
    });
  }
);

//@route      GET api/notes/:id
//@desc       Get note by id
//@access     Private

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Note.findById(req.params.id)
        .then(note => {
          // Check for note owner
          if (note.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          
          res.json(note);
        })
        .catch(err =>
          res.status(404).json({ nonotefound: "No note found with this id" })
        );
    });
  }
);

//@route      POST api/notes
//@desc       Create note
//@access     Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNoteInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newNote = new Note({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
      iscompleted: req.body.iscompleted
    });
    newNote.save().then(note => res.json(note));
  }
);

//@route      POST api/notes/complete/:id
//@desc       complete note
//@access     Private
router.post(
  "/complete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Note.findById(req.params.id)
        .then(note => {
          note.iscompleted = true;
          note.save().then(note => res.json(note));
        })
        .catch(err => res.status(404).json({ notenotfound: "No note found" }));
    });
  }
);

//@route      DELETE api/notes/:id
//@desc       Delete note by id
//@access     Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Note.findById(req.params.id)
        .then(note => {
          // Check for note owner
          if (note.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          // Delete
          note.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ notenotfound: "No note found" }));
    });
  }
);

//@route      POST api/notes/comment/:id
//@desc       Add a comment note
//@access     Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNoteInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Note.findById(req.params.id)
      .then(note => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        //Add to comments array
        note.comments.unshift(newComment);

        //Save
        note.save().then(note => res.json(note));
      })
      .catch(err => res.status(404).json({ notenotfound: "No note found" }));
  }
);

//@route      DELETE api/notes/comment/:id/:comment_id
//@desc       Delete a comment from note
//@access     Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        // Check to see if the comment exists
        if (
          note.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }
        // Get remove index
        const removeIndex = note.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        note.comments.splice(removeIndex, 1);
        note.save().then(note => res.json(note));
      })
      .catch(err => res.status(404).json({ notenotfound: "No note found" }));
  }
);

module.exports = router;
