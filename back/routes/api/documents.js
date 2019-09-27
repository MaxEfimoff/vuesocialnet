const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// Profile model
const Profile = require("../../db/models/Profile");

// Note model
const Document = require('../../db/models/Document');

// Validation
// const validateNoteInput = require("../../validation/note");

const db = require("../../config/keys").mongoURI;

// Init gfs
const conn = mongoose.connection;
let gfs;
// Init stream
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
        // const user = req.user.id;
        const fileInfo = {
          filename: filename,
          // user: user,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
  }
});
const upload = multer({ storage });

//@route      POST api/notes
//@desc       Create note
//@access     Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }), upload.single('file'),
  (req, res) => {
    res.json({ file: req.file })
    // const newDocument = new Document({
    //   document: req.body.name,
    //   // user: req.user.id,
    // });
    // newDocument.save().then(document => res.json(document));
  }
);

// const MAX_SIZE = 1400000;
    
    // const upload = multer({
    //   dest: './uploads',
    //   // fileFilter,
    //   limits: {
    //     fileSize: MAX_SIZE
    //   }
    // });

//@route      GET api/documents
//@desc       Get document
//@access     Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files exist
      if(!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exists'
        });
      }
      // Files exist
      return res.json(files);
    })
    // Profile.findOne({ user: req.user.id }).then(profile => {
    //   Document.find()
    //     .sort({ date: -1 })
    //     .then(documents =>
    //       res.json(documents.filter(document => document.user.toString() === req.user.id))
    //     )
    //     .catch(err =>
    //       res.status(404).json({ nodocumentsfound: "No documents found" })
    //     );
    // });
    
  }
);

//@route      GET api/notes/:id
//@desc       Get note by id
//@access     Private

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Document.findById(req.params.id)
        .then(document => {
          // Check for document owner
          if (document.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          
          res.json(document);
        })
        .catch(err =>
          res.status(404).json({ nodocumentfound: "No document found with this id" })
        );
    });
  }
);




module.exports = router;
