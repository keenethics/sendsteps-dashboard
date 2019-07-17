const express = require('express');
const login = require('../controllers/login');


const router = express.Router();

router.route('/')
  .post(
    login.getUser,
  );

  router.route('/check_auth')
  .post(
    login.checkAuth,
  );


module.exports = router;

