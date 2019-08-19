const express = require('express');
const { getResponseSettings, updateResponseSettings, getNumberByIsoCode, checkResponseCode } = require('../controllers/responseSettings');

const router = express.Router();

router.route('/settings').post(getResponseSettings);
router.route('/update').post(updateResponseSettings);
router.route('/number').post(getNumberByIsoCode);
router.route('/checkCode').post(checkResponseCode);

module.exports = router;
