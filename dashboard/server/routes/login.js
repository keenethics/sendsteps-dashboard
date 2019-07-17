const express = require('express');
const login = require('../controllers/login');


const router = express.Router();

router.route('/')
  .post(
    login.getUser,
  );


module.exports = router;

