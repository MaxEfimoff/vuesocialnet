const express = require('express');
const router = express.Router();
const passport = require('passport');

// Event model
const Event = require('../../db/models/Event');
// Profile model
const Profile = require('../../db/models/Profile');

// Validation
const validateEventInput = require('../../validation/event');

// Shortened for /api/events/test
router.get('/test', (req, res) => res.json({msg:'events works'}));

//@route      GET api/events/
//@desc       Get events
//@access     Private
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
  Event
    .find()
    .populate('profile -avatar -handle')
    .populate('eventCategory')
    .populate('joinedPeople')
    .sort({date: -1})
    .then(events => res.json(events))
    .catch(err => res.status(404).json({noeventsfound: 'No events found'}));
})

//@route      GET api/my-events/
//@desc       Get my events
//@access     Private
router.get('/my-events', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    Event
    .find({profile: profile._id})
    .populate('profile -avatar -handle')
    .populate('eventCategory')
    .populate('joinedPeople')
    .sort({date: -1})
    .then(events => res.json(events))
    .catch(err => res.status(404).json({noeventsfound: 'No events found'}));
  })
})

//@route      GET api/friends-events/
//@desc       Get friends events
//@access     Private
router.get('/friends-events', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Event
        .find({name: { $in: profile.friends.map(a => a.handle) }})
        .populate('profile -avatar -handle')
        .populate('eventCategory')
        .populate('joinedPeople')
        .sort({date: -1})
        .then(events => res.json(events))
        .catch(err => res.status(404).json({noeventsfound: 'No events found'}));
    })
})

//@route      GET api/events/:id
//@desc       Get event by id
//@access     Private
router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Event
    .findById(req.params.id)
    .populate('profile -avatar -handle')
    .populate('eventCategory')
    .populate({
      path: 'joinedPeople',
      options: {
        limit: 5,
        sort: {username: -1}
      }
    })
    .then(event => res.json(event))
    .catch(err => res.status(404).json({noeventfound: 'No event found with that Id'}));
})

//@route      POST api/events/
//@desc       Create event
//@access     Private
router.post('/', passport.authenticate("jwt", { session: false }), (req, res) => {
  const {errors, isValid} = validateEventInput(req.body);

  // Check Validation
  if(!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newEvent = new Event({
    profile: req.body.profile,
    eventCategory: req.body.category,
    location: req.body.location,
    processedLocation: req.body.processedLocation,
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    shortInfo: req.body.shortInfo,
    startDate: req.body.startDate,
    timeFrom: req.body.timeFrom,
    timeTo: req.body.timeTo,
    status: 'active',
  });

  newEvent.save()
    .then(event => res.json(event));
});

//@route      PATCH api/events/
//@desc       Update event
//@access     Private
router.patch('/:id/update-event', passport.authenticate("jwt", { session: false }), (req, res) => {
  const {errors, isValid} = validateEventInput(req.body);

  // Check Validation
  if(!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  // Get fields
  const eventFields = {};
  if (req.body.profile) eventFields.eventCreator = req.body.profile;
  if (req.body.category) eventFields.eventCategory = req.body.category;
  if (req.body.location) eventFields.location = req.body.location;
  if (req.body.processedLocation) eventFields.processedLocation = req.body.processedLocation;
  if (req.body.title) eventFields.title = req.body.title;
  if (req.body.image) eventFields.image = req.body.image;
  if (req.body.description) eventFields.description = req.body.description;
  if (req.body.shortInfo) eventFields.shortInfo = req.body.shortInfo;
  if (req.body.startDate) eventFields.startDate = req.body.startDate;
  if (req.body.timeFrom) eventFields.timeFrom = req.body.timeFrom;
  if (req.body.timeTo) eventFields.timeTo = req.body.timeTo;
  if (req.body.status) eventFields.status = req.body.status;

  Event.findById(req.params.id)
    .then(event => {
      // Check if current profile is the event owner
      if(eventCreator.profile.toString() !== req.profile.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' })
      }

      event.set(eventFields)
      event.save()
      .then(event => 
        res.json(event)
        );
    })
});

//@route      DELETE api/events/:id
//@desc       Delete event by id
//@access     Private
router.delete('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ profile: req.profile.id })
    .then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          // Check if current profile is the event owner
          if(eventCreator.profile.toString() !== req.profile.id) {
            return res.status(401).json({ notauthorized: 'User not authorized' })
          }

          // Delete event
          event.remove().then(() => res.json({ success: true }));
        }).catch(err => res.status(404).json({ eventnotfound: 'event not found' }));
   })
});


//@route      POST api/events/comment/:id
//@desc       Add a comment event
//@access     Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Event.findById(req.params.id)
      .then(event => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          profile: req.body.profile,
          avatar: req.body.avatar
        };

        // Add to comments array
        event.comments.push(newComment);

        // Save
        event.save().then(event => res.json(event));
      })
      .catch(err => res.status(404).json({ eventnotfound: "No event found" }));
  }
);

module.exports = router;