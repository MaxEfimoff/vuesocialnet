const express = require('express');
const router = express.Router();

// Shortened for /api/posts/test
router.get('/test', (req, res) => res.json({msg:'posts works'}));

module.exports = router;