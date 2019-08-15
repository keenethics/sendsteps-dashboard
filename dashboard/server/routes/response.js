const express = require('express');
const { getResponseSettings } = require('../controllers/response');

const router = express.Router();

router.route('/settings').post(getResponseSettings);

module.exports = router;
