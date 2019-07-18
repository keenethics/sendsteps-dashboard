const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const getUserData = require('../controllers/getUserData');

const router = express.Router();

router.route('/')
  .get(
    checkJWT(),
    getUserData
  );

module.exports = router;

