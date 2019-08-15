const express = require('express');
const { getResponseSettings, updateResponseSettings } = require('../controllers/response');

const router = express.Router();

router.route('/settings').post(getResponseSettings);
router.route('/update').post(updateResponseSettings);

module.exports = router;
