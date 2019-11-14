const express = require("express");
const router = express.Router();
const passport = require("passport");

// Thread model
const EventThread = require('../../db/models/EventThread');

// Thread Post model
const EventThreadPost = require('../../db/models/EventThreadPost');

// Validation
const validateEventThreadInput = require("../../validation/eventthread");

//@route      POST api/eventthreads
//@desc       Create event thread
//@access     Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventThreadInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    
    const newEventThread = new EventThread({
      profile: req.body.profile._id,
      title: req.body.title,
      event: req.body.event,
    });
    console.log(newEventThread)
    newEventThread.save().then(eventThread => res.json(eventThread));
  }
);

//@route      GET api/eventthreads
//@desc       Get event threads
//@access     Private
router.get("/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const eventId = req.query.eventId;

    const pageSize = parseInt(req.query.pageSize) || 5;
    const pageNum = parseInt(req.query.pageNum) || 1;

    const skips = pageSize * (pageNum - 1)

    EventThread.find({})
          .where({'event': eventId})
          .skip(skips)
          .limit(pageSize + 1)
          .sort({'createdAt': -1})
          .populate('profile -avatar -handle')
          .populate({
            path: 'eventThreadPosts',
            options: { limit: 5, sort: {'createdAt': 1}},
            populate: {path: 'profile'}
          })
          .exec((errors, eventthreads) => {

      if (errors) {
          return res.status(422).send({errors});
      }

      let isAllDataLoaded = false;
      if (eventthreads.length <= 5 ) {
        isAllDataLoaded = true
      }

      return res.json({eventthreads: eventthreads.splice(0, 5), isAllDataLoaded});
    });
  }
)

//@route      POST api/eventthreads
//@desc       Create event thread
//@access     Private
router.post(
  "/eventpost",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
    // const { errors, isValid } = validateEventThreadInput(req.body);

    // // Check validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }
    

      const post = new EventThreadPost({
        text: req.body.text,
        eventThread: req.body.eventThread
      });
      post.profile = profile;

      post.save((errors, post) => {
        if (errors) {
          return res.status(422).send({errors});
        }
        EventThread.update({ _id: post.eventThread }, { $push: { eventThreadPosts: post }}, () => {})
        return res.json(post)
      });
    })
  }
)


module.exports = router;