const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const fs = require('fs');
const path= require("path");
const multer= require("multer");

// Profile model
const Profile = require("../../db/models/Profile");

// Image model
const Image = require('../../db/models/Image');

const db = require("../../config/keys").mongoURI;

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
router.delete("/:id", (req,res) => {
  const query= { image: req.params.id };
  Image.remove(query, (err) => {
    if(err){
      console.log(err);
    } else {
      let $filePath= "./uploads/" + req.params.id
      fs.unlinkSync($filePath, (err) => {
        if(err){
          console.log("couldnt delete " + req.params.id + " image");
        }              
      });
      res.send("The image was deleted...");
    }
  });
});

module.exports = router;