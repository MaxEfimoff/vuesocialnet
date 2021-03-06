const express = require("express");
const router = express.Router();
const passport = require("passport");
const fs = require('fs');
const path= require("path");
const multer= require("multer");

// Profile model
const Profile = require("../../db/models/Profile");

// Image model
const Image = require('../../db/models/Image');

// Storage management for the file
// that will be uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

// Management of the storage and the file that will be uploaded 
// .single expects the name of the file input field
const upload = multer({storage: storage}).single("file");

//@route      GET api/photos
//@desc       Show photos
//@access     Private
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  // Profile.findOne({ user: req.user.id }).then(profile => {
    Image.find()
      .sort({ date: -1 })
      .then(images =>
        res.json(images.filter(image => image.user.toString() === req.user.id))
      )
      .catch(err =>
        res.status(404).json({ nophotofound: "No photos found" })
      );
    // });
  }
);

//@route      GET api/photos/:id
//@desc       Get photo by id
//@access     Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Image.findById(req.params.id)
        .then(image => {
          res.json(image);
        })
        .catch(err =>
          res.status(404).json({ nophotofound: "No photo found with this id" })
        );
    });
  }
);

//@route      GET api/photos
//@desc       Show photos
//@access     Private
router.get('/handle/:handle/', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
    Image.find()
      .sort({ date: -1 })
      .then(images =>
        res.json(images.filter(image => image.user.toString() === profile.user._id.toString()))
      )
      .catch(err =>
        res.status(404).json({ nophotofound: "No photos found" })
      );
    });
  }
);

//@route      POST api/image
//@desc       Upload image
//@access     Private
router.post("/", passport.authenticate('jwt', { session: false}), (req, res) => {
  upload(req, res, (err) => {
    if(req.file == null || req.file == undefined || req.file == ""){
      res.json('No Image Set');
    } else {
      if (err) {
        console.log(err);
        } else {
          let image = new Image();
          image.image = req.file.filename;
          image.user = req.query.user;
          image.save(()=>{
            if (err) return next(err);
              res.json(image.image);
          });
        }
      }
  });  
});

//@route      DELETE api/image
//@desc       Delete image
//@access     Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req,res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Image.findById(req.params.id)
    .then(image => {
      // Check for image owner
      if (image.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ notauthorized: "User not authorized" });
      }
      // Delete
      image.remove();
      // const filePath = `../../uploads/${req.params.id}`;
      // fs.unlink(filePath);
      res.send("The image was deleted...");
    })
    .catch(err => res.status(404).json({ photonotfound: "No photo found" }));
  });
});

//@route      POST api/photos/comment/:id
//@desc       Add a comment
//@access     Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validatePostInput(req.body);

    // // Check validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   return res.status(400).json(errors);
    // }

    Image.findById(req.params.id)
      .then(image => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        image.comments.push(newComment);

        // Save
        image.save().then(image => res.json(image));
      })
      .catch(err => res.status(404).json({ imagenotfound: "No image found" }));
  }
);

//@route      POST api/photos/like/:id
//@desc       Like photo
//@access     Private
router.post('/like/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Image.findById(req.params.id)
        .then(image => {
          // Check if user already liked this image
          // Loops through likes array and checks if user id is there
          // If req.params.id is in the image.likes array, filtered array length will be > 0
          if(image.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyliked: 'User already liked this image' })
          }

          // Add user id to likes array
          image.likes.unshift({ user: req.user.id });

          image.save()
            .then(image => res.json(image));
          
        }).catch(err => res.status(404).json({ imagenotfound: 'image not found' }));
   })
});

module.exports = router;