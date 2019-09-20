const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load Profile model
const Profile = require('../../db/models/Profile');

// Load User model
const user = require('../../db/models/User');

// Shortened for /api/profile/test
router.get('/test', (req, res) => res.json({msg:'profile works'}));

// @route     GET api/profile
// @desc      Get current users profile
// @access    Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  // Search for profile associated with current user.id
  Profile.findOne({ user: req.user.id })
    // Populate profile fields with data from users
    .populate('user', ['name', 'avatar'])
    .then(
      profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route      GET api/profile/all
//@desc       Get all profiles
//@access     Private
router.get("/all", passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @route     GET api/profile/handle/:handle
// @desc      Get profile by handle
// @access    Private
router.get('/handle/:handle', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};

  // req.params.handle will grab :handle 
  Profile.findOne({ handle: req.params.handle })
  // Populate profile fields with data from users
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route     GET api/profile/user/:user_id
// @desc      Get profile by user Id
// @access    Private
router.get('/user/:user_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};

  // req.params.user_id will grab :user_id 
  Profile.findOne({ user: req.params.user_id })
  // Populate profile fields with data from users
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// @route     POST api/profile
// @desc      Create or edit users profile
// @access    Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation
  if(!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;

  // Check if this was sent in from the form
  if(req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  // Skills - split into array
  // if (typeof req.body.skills !== "undefined") {
  //     profileFields.skills = req.body.skills.split(",");
  //   }
  // Social
  // profileFields.social = {};
  // if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  // if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  // if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  // if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  // if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  // if (req.body.github)
  //     profileFields.github = req.body.github;

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(profile) {
        // Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        .then(profile => res.json(profile));
      } else {
        // Create profile

        // Check if handle already exists
        // Looking for handle in profileFields object
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if(profile) {
              errors.handle = 'That handle already in use';
              res.status(400).json(errors);
            }

            // Save profile if handle not in use
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          });
      }
    });
});

//@route      POST api/profile/experience
//@desc       Add experience to profile
//@access     Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check validation
    if (!isValid) {
      // Return errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // Add to experience array
      profile.experience.unshift(newExp);

      profile.save()
        .then(profile => res.json(profile));
    });
  }
);

//@route      POST api/profile/education
//@desc       Add education to profile
//@access     Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check validation
    if (!isValid) {
      // Return errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        faculty: req.body.faculty,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // Add to education array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route      DELETE api/profile/experience/:exp_id
//@desc       Delete experience from profile
//@access     Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    

    Profile.findOne({ user: req.user.id }).then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id)

      // Splice out of array
      profile.experience.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
  }
);

//@route      DELETE api/profile/education/:exp_id
//@desc       Delete education from profile
//@access     Private
router.delete(
  "/education/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    

    Profile.findOne({ user: req.user.id }).then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.exp_id)

      // Splice out of array
      profile.education.splice(removeIndex, 1);

      // Save
      profile.save().then(profile => res.json(profile));

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
  }
);

//@route      DELETE api/profile/
//@desc       Delete user and profile
//@access     Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
      .then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;