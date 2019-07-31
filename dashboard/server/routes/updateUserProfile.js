const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const uploadFile = require("../middlewares/multerFileUpload");
const { updateUserProfile } = require('../controllers/updateUserProfile');

const router = express.Router();

router.route('/').post(
  checkJWT(),
  uploadFile.single('file'),
  updateUserProfile
);

module.exports = router;
