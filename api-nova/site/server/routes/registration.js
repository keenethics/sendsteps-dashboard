const express = require("express");
const registration = require("../controllers/registration");

const router = express.Router();

router.route("/").post(registration.registerUser);

module.exports = router;
