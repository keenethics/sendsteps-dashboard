const express = require("express");
const {
  getSessionData,
  deleteIdentificationQuestion,
  createIdentificationQuestion,
  setIdentificationType,
  getQuestions,
} = require('../controllers/audienceIdentification');
const checkJWT = require('../middlewares/checkJWT');
const getLastSession = require('../middlewares/getLastSession');

const router = express.Router();

router.route("/getIdentificationType").post(checkJWT(), getLastSession, getSessionData);
router.route("/createIdentificationQuestion").post(checkJWT(), getLastSession, createIdentificationQuestion);
router.route("/deleteIdentificationQuestion").post(checkJWT(), getLastSession, deleteIdentificationQuestion);
router.route("/setIdentificationType").post(checkJWT(), getLastSession, setIdentificationType);
router.route("/getQuestions").post(checkJWT(), getLastSession, getQuestions);

module.exports = router;
