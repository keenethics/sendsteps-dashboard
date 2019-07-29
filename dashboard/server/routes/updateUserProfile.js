const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const updateUserProfile = require('../controllers/updateUserProfile');

const router = express.Router();

router.route('/').post(
  checkJWT(), 
  updateUserProfile
);

module.exports = router;
