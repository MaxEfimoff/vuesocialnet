const express = require('express');
const router = express.Router();

// Shortened for /api/users/test
router.get('/test', (req, res) => res.json({msg:'users work'}));

module.exports = router;