const express = require('express');
const router = express.Router();
const passport = require('passport');

// Product model
const Product = require('../../db/models/Product');
// Profile model
const Profile = require('../../db/models/Profile');

// Validation
const validateProductInput = require('../../validation/product');

// Shortened for /api/products/test
router.get('/test', (req, res) => res.json({msg:'products works'}));

//@route      GET api/products/
//@desc       Get products
//@access     Private
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
  Product
    .find()
    .sort({date: -1})
    .then(products => res.json(products))
    .catch(err => res.status(404).json({noproductsfound: 'No products found'}));
})

//@route      GET api/my-products/
//@desc       Get my products
//@access     Private
router.get('/my-products', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    Product
    .find({name: profile.handle})
    .sort({date: -1})
    .then(products => res.json(products))
  })
    .catch(err => res.status(404).json({noproductsfound: 'No products found'}));
})

//@route      GET api/friends-products/
//@desc       Get friends products
//@access     Private
router.get('/friends-products', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Product
        .find({name: { $in: profile.friends.map(a => a.handle) }})
        .sort({date: -1})
        .then(products => res.json(products)
        )
        .catch(err => res.status(404).json({noproductsfound: 'No products found'}));
  })
})

//@route      GET api/products/:id
//@desc       Get product by id
//@access     Private
router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Product
    .findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(404).json({noproductfound: 'No product found with that Id'}));
})

//@route      POST api/products/
//@desc       Create product
//@access     Private
router.post('/', passport.authenticate("jwt", { session: false }), (req, res) => {
  const {errors, isValid} = validateProductInput(req.body);

  // Check Validation
  if(!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newProduct = new Product({
    profile: req.body.profile,
    avatar: req.body.avatar,
    name: req.body.name,
    image: req.body.image,
    text: req.body.text,
    category: req.body.category,
  });

  newProduct.save()
    .then(product => res.json(product));
});

//@route      PATCH api/products/
//@desc       Update product
//@access     Private
router.patch('/:id/update-product', passport.authenticate("jwt", { session: false }), (req, res) => {
  const {errors, isValid} = validateProductInput(req.body);

  // Check Validation
  if(!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  // Get fields
  const productFields = {};
  if (req.body.profile) productFields.profile = req.body.profile;
  if (req.body.avatar) productFields.avatar = req.body.avatar;
  if (req.body.image) productFields.image = req.body.image;
  if (req.body.text) productFields.text = req.body.text;
  if (req.body.category) productFields.category = req.body.category;

  Product.findById(req.params.id)
    .then(product => {
      product.set(productFields)
      product.save()
      .then(product => 
        res.json(product)
        );
    })
});

//@route      DELETE api/products/:id
//@desc       Delete product by id
//@access     Private
router.delete('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ profile: req.profile.id })
    .then(profile => {
      Product.findById(req.params.id)
        .then(product => {
          // Check if current profile is the product owner
          if(product.profile.toString() !== req.profile.id) {
            return res.status(401).json({ notauthorized: 'User not authorized' })
          }

          // Delete product
          product.remove().then(() => res.json({ success: true }));
        }).catch(err => res.status(404).json({ productnotfound: 'product not found' }));
   })
});

//@route      POST api/products/like/:id
//@desc       Like product
//@access     Private
router.post('/like/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Product.findById(req.params.id)
        .then(product => {
          // Check if user already liked this product
          // Loops through likes array and checks if user id is there
          // If req.params.id is in the product.likes array, filtered array length will be > 0
          if(product.likes.filter(like => like.profile.toString() === req.profile.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this product' })
          }

          // Add user id to likes array
          product.likes.unshift({ user: req.user.id });

          product.save()
            .then(product => res.json(product));
          
        }).catch(err => res.status(404).json({ productnotfound: 'product not found' }));
   })
});

//@route      POST api/products/unlike/:id
//@desc       Unike product
//@access     Private
router.post('/unlike/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Product.findById(req.params.id)
        .then(product => {
          if(product.likes.filter(like => like.profile.toString() === req.profile.id).length === 0) {
            return res.status(400).json({ notliked: 'You have not yet liked this product' })
          }

          // Get the remove index
          const removeIndex = product.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          product.likes.splice(removeIndex, 1);

          // Save
          product.save().then(product => res.json(product));
          
        }).catch(err => res.status(404).json({ productnotfound: 'product not found' }));
   })
});

//@route      POST api/products/comment/:id
//@desc       Add a comment product
//@access     Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Product.findById(req.params.id)
      .then(product => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          profile: req.body.profile,
          avatar: req.body.avatar
        };

        // Add to comments array
        product.comments.push(newComment);

        // Save
        product.save().then(product => res.json(product));
      })
      .catch(err => res.status(404).json({ productnotfound: "No product found" }));
  }
);

//@route      DELETE api/products/comment/:id/:comment_id
//@desc       Delete a comment from product
//@access     Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then(product => {

        //Check to see if the comment exists
        if (
          product.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = product.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        product.comments.splice(removeIndex, 1);
        product.save().then(product => res.json(product));
      })
      .catch(err => res.status(404).json({ productnotfound: "No product found" }));
  }
);

//@route      GET api/products
//@desc       Show user's products
//@access     Private
router.get('/handle/:handle/', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .then(profile => {
    Product.find({name: profile.handle})
      .sort({ date: -1 })
      .then(products =>
        res.json(products))
      .catch(err =>
        res.status(404).json({ noproductfound: "No products found" })
      );
    });
  }
);

module.exports = router;