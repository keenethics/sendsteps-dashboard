const express = require('express');
const models = require('../models');
const router = express.Router();
const { getSessionDataByUserIdAndEmail } = require('../controllers/audienceIdentification');

router.route('/').post(getSessionDataByUserIdAndEmail);

module.exports = router;
