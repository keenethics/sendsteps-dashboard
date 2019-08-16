const express = require('express');
const { getResponseSettings, updateResponseSettings, getNumberByIsoCode } = require('../controllers/response');

const router = express.Router();

router.route('/settings').post(getResponseSettings);
router.route('/update').post(updateResponseSettings);
router.route('/number').post(getNumberByIsoCode);

module.exports = router;
