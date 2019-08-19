const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const getLastSession = require('../middlewares/getLastSession');
const {
  getResponseSettings,
  updateResponseSettings,
  getNumberByIsoCode,
  checkResponseCode
} = require('../controllers/responseSettings');

const router = express.Router();

router.route('/settings').post(checkJWT(), getLastSession, getResponseSettings);
router.route('/update').post(updateResponseSettings);
router.route('/number').post(getNumberByIsoCode);
router.route('/checkCode').post(checkResponseCode);

module.exports = router;
