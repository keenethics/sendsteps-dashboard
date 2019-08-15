const express = require("express");
const { getSessionDataByUserIdAndEmail, setIdentificationType } = require('../controllers/audienceIdentification');
const checkJWT = require('../middlewares/checkJWT');

const router = express.Router();

router.route("/getIdentificationType").post(checkJWT(), getSessionDataByUserIdAndEmail);
router.route("/setIdentificationType").post(checkJWT(), setIdentificationType);

module.exports = router;
