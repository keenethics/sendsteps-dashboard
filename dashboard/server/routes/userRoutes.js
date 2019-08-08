const express = require("express");
const { changePassword } = require("../controllers/changePassword");
const { generateResetLink, resetUserPassword, checkPasswordResetLink } = require("../controllers/resetUserPassword");

const router = express.Router();

router.route("/changePassword").post(changePassword);
router.route("/requestPasswordReset").post(generateResetLink);
router.route("/resetUserPassword").post(resetUserPassword);
router.route("/resetPassword").get(checkPasswordResetLink);

module.exports = router;
