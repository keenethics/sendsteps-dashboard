const express = require('express');
const login = require('../controllers/login');
const checkJWT = require('../middlewares/checkJWT');

const router = express.Router();

router.route('/')
  .post(
    login.getUser,
  );

router.route('/check_auth')
  .get(
    checkJWT(),
    login.getUserData,
  );


module.exports = router;

