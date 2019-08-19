const express = require("express");
const {
  getSessionDataByUserIdAndEmail,
  deleteIdentificationQuestion,
  createIdentificationQuestion,
  setIdentificationType,
  getQuestions,
} = require('../controllers/audienceIdentification');
const checkJWT = require('../middlewares/checkJWT');

const router = express.Router();

router.route("/getIdentificationType").post(checkJWT(), getSessionDataByUserIdAndEmail);
router.route("/createIdentificationQuestion").post(checkJWT(), createIdentificationQuestion);
router.route("/deleteIdentificationQuestion").post(checkJWT(), deleteIdentificationQuestion);
router.route("/setIdentificationType").post(checkJWT(), setIdentificationType);
router.route("/getQuestions").post(checkJWT(), getQuestions);

module.exports = router;
