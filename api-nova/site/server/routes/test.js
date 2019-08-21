const express = require('express');
const models = require('../models');
const router = express.Router();
const { getSessionData } = require('../controllers/audienceIdentification');

router.route('/').post((req, res) => {
  return res.json('OK');
});

module.exports = router;
