const express = require('express');
const router = express.Router();

// Shortened for /api/profile/test
router.get('/test', (req, res) => res.json({msg:'profile works'}));

module.exports = router;