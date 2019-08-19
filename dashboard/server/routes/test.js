const express = require('express');
const models = require('../models');
const router = express.Router();
const { getSessionData } = require('../controllers/audienceIdentification');

router.route('/').post(getSessionData);

module.exports = router;
