const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const multerFileUpload = require("../middlewares/multerFileUpload");
const { updateUserProfile } = require('../controllers/updateUserProfile');

const router = express.Router();

router.route('/').post(
  checkJWT(),
  multerFileUpload.uploadFile,
  updateUserProfile
);

module.exports = router;
