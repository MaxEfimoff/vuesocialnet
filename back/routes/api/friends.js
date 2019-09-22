const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

//Load profile model
const Profile = require("../../models/Profile");
//Load user model
const User = require("../../models/User");

//route GET api/profile/test
//desc  Tests profile route
//access Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//route GET api/profile
//desc  Get current users profile
//access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//route GET api/profile/all
//desc  Get all profiles
//access Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(
        friends.filter(
          profile => profile.friens.user.toString() === req.user.id
        )
      );
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

//route GET api/profile/handle/:handle
//desc  Get profile by handle
//access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//route GET api/profile/user/:user_id
//desc  Get profile by user ID
//access Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//route POST api/profile/friend/:id
//desc  friend post
//access Private
router.post(
  "/profile/friend/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Profile.findById(req.params.id)
        .then(friend => {
          if (
            friend.friends.filter(
              friend => friend.user.toString() === req.user.id
            ).length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyfriendd: "User already friendd this friend" });
          }
          //Add user ID to friends array
          friend.friends.unshift({ user: req.user.id });
          friend.save().then(friend => res.json(friend));
        })
        .catch(err =>
          res.status(404).json({ friendnotfound: "No post found" })
        );
    });
  }
);

module.exports = router;
