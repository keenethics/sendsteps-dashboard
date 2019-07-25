const express = require("express");
const { changePassword } = require("../controllers/changePassword");

const router = express.Router();

router.route("/changePassword").post(changePassword);

module.exports = router;
