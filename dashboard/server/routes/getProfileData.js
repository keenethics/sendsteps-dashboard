const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const getProfileData = require('../controllers/getProfileData');

const router = express.Router();

router.route('/')
  .get(
    checkJWT(),
    getProfileData
  );

module.exports = router;

