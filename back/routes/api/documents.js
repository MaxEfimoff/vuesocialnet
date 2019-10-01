const express = require("express");
const router = express.Router();
const passport = require("passport");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');

// Profile model
const Profile = require("../../db/models/Profile");

// Document model
const Document = require('../../db/models/Document');

// Validation
// const validateNoteInput = require("../../validation/note");

// Storage management for the file
// that will be uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
  // limits: {
  //   fileSize: 2000
  // }
});

// Management of the storage and the file that will be uploaded 
// .single expects the name of the file input field
const upload = multer({storage: storage}).single("file");

//@route      GET api/documents
//@desc       Get document
//@access     Private
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Document.find()
      .sort({ date: -1 })
      .then(documents =>
        res.json(documents.filter(document => document.user.toString() === req.user.id))
      )
      .catch(err =>
        res.status(404).json({ nodocumentsfound: "No documents found" })
      );
    });
  }
);

//@route      GET api/documents/:id
//@desc       Get document by id
//@access     Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Document.findById(req.params.id)
        .then(document => {
          res.json(document);
        })
        .catch(err =>
          res.status(404).json({ nodocumentfound: "No document found with this id" })
        );
    });
  }
);

//@route      POST api/documents
//@desc       Create document
//@access     Private
router.post("/", passport.authenticate('jwt', { session: false}), (req, res) => {
  upload(req, res, (err) => {
    if(req.file == null || req.file == undefined || req.file == ""){
      res.json('No Document Set');
    } else {
      if (err) {
        console.log(err);
        } else {
          let document = new Document();
          document.document = req.file.filename;
          document.user = req.query.user;
          document.save(()=>{
            if (err) return next(err);
              res.json(document.document);
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
    Document.findById(req.params.id)
    .then(document => {
      // Check for document owner
      if (document.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ notauthorized: "User not authorized" });
      }
      // Delete
      document.remove();
      // const filePath = `../../uploads/${req.params.id}`;
      // fs.unlink(filePath);
      res.send("The document was deleted...");
    })
    .catch(err => res.status(404).json({ photonotfound: "No photo found" }));
  });
});

module.exports = router;
