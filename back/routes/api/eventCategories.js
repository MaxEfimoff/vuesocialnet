const express = require("express");
const router = express.Router();
const passport = require("passport");

// Category model
const EventCategory = require('../../db/models/EventCategory');

// Validation
const validateEventCategoryInput = require("../../validation/eventcategory");

//@route      GET api/eventcategories
//@desc       Get event category
//@access     Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    EventCategory.find()
      .sort({ name: 1 })
      .then(eventcategories =>
        res.json(eventcategories)
      )
      .catch(err =>
        res.status(404).json({ noeventcategoriesfound: "No categories found" })
      );
  }
);


//@route      POST api/eventcategories
//@desc       Create event category
//@access     Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEventCategoryInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newEventCategory = new EventCategory({
      name: req.body.name,
      image: req.body.image
    });
    newEventCategory.save().then(eventcategory => res.json(eventcategory));
  }
);


//@route      DELETE api/eventcategories/:id
//@desc       Delete event category by id
//@access     Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    EventCategory.findById(req.params.id)
      .then(eventcategory => {
        // Delete
        eventcategory.remove()
          .then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ eventcategorynotfound: "No event category found" }));
  }
);


module.exports = router;
