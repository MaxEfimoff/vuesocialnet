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
  const {eventcategory} = req.query || {};
  const {location} = req.query || {};
  // const findQuery = location ? Event.find({ processedLocation: { $regex: '.*' + location + '.*' } }) : Event.find({})
  const findQuery = location ? Event.find({ location }) : Event.find({})
  findQuery
    .find()
    .populate('profile -avatar -handle')
    .populate('eventcategory')
    .populate('joinedPeople')
    .limit(5)
    .sort({date: -1})
    .exec((errors, events) => {
      if (errors) {
        return res.status(422).send({errors});
      }
  
      if (eventcategory) {
        events = events.filter(event => {
          return event.eventcategory.name === eventcategory
        })
      }
  
      return res.json(events);
    });
})

//@route      GET api/my-events/
//@desc       Get my events
//@access     Private
router.get('/my-events', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    Event
    .find({profile: profile})
    .populate('profile -avatar -handle')
    .populate('eventcategory')
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
        .populate('eventcategory')
        .populate('joinedPeople')
        .sort({date: -1})
        .then(events => res.json(events))
        .catch(err => res.status(404).json({noeventsfound: 'No events found'}));
    })
})

//@route      GET api/joined-events/
//@desc       Get joined events
//@access     Private
router.get('/my-joined-events', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Event
        .find({joinedPeople: [profile]})
        .populate('profile -avatar -handle')
        .populate('eventcategory')
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
    .populate('eventcategory')
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
    eventcategory: req.body.category,
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
  if (req.body.profile) eventFields.profile = req.body.profile;
  if (req.body.category) eventFields.eventcategory = req.body.category;
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
  eventFields.updatedAt = new Date();

  Event
    .findById(req.params.id)
    .populate('profile -avatar -handle')
    .populate('eventcategory')
    .then(event => {
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
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          // Check if current profile is the event owner
          // if(eventCreator.profile.toString() !== req.profile.id) {
          //   return res.status(401).json({ notauthorized: 'User not authorized' })
          // }

          // Delete event
          event.remove().then(() => res.json({ success: true }));
        }).catch(err => res.status(404).json({ eventnotfound: 'event not found' }));
   })
});

//@route      POST api/events/join
//@desc       Join event
//@access     Private
router.post('/join/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          // if(event.joinedPeople.filter(person => person.profile === req.profile.id).length > 0) {
          //   return res.status(400).json({ alreadyjoined: 'You have already joined this event' })
          // }

          event.joinedPeople.push(profile);
          event.joinedPeopleCount++;

          return Promise.all([
            Profile.updateOne({ _id: profile.id }, { $push: { joinedEvents: event }}),
            event.save()
          ])
          .then(event => 
            res.json(event));
          })
          .catch(err => res.status(404).json({ eventnotfound: 'Event not found' }));
        })
});

//@route      POST api/events/join
//@desc       Join event
//@access     Private
router.post('/leave/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          // if(event.joinedPeople.filter(person => person.profile === req.profile).length == 0) {
          //   return res.status(400).json({ notjoined: 'You have not joined this event yet' })
          // }

          return Promise.all([
            Profile.updateOne({ _id: profile.id }, { $pull: { joinedEvents: event.id }}),
            Event.updateOne({ _id: event.id }, { $pull: { joinedPeople: profile.id }, $inc: {joinedPeopleCount: -1}})
          ])
          // .then(event => res.json(event));
          .then(result => res.json(req.params.id))
          })
          .catch(err => res.status(404).json({ eventnotfound: 'Event not found' }));
        })
});

module.exports = router;