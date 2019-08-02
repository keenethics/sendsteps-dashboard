const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const getDownloadAddInUrl = require('../controllers/getDownloadAddInUrl');

const router = express.Router();

router.route('/').post(
  checkJWT(), 
  getDownloadAddInUrl
);

module.exports = router;
