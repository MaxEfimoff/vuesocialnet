const express = require("express");
const router = express.Router();
const passport = require("passport");

// Category model
const Category = require('../../db/models/Category');

// Validation
const validateCategoryInput = require("../../validation/category");

//@route      GET api/categories
//@desc       Get category
//@access     Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.find()
      .sort({ name: 1 })
      .then(categories =>
        res.json(categories)
      )
      .catch(err =>
        res.status(404).json({ nocategoriesfound: "No categories found" })
      );
  }
);


//@route      POST api/categories
//@desc       Create category
//@access     Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newCategory = new Category({
      name: req.body.name
    });
    newCategory.save().then(category => res.json(category));
  }
);


//@route      DELETE api/categories/:id
//@desc       Delete category by id
//@access     Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.findById(req.params.id)
      .then(category => {
        // Delete
        category.remove()
          .then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ categorynotfound: "No category found" }));
  }
);


module.exports = router;
