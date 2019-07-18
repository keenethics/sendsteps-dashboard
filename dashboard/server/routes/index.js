const express = require("express");
const authTest = require("./authTest");
const login = require("./login");
const registration = require("./registration");
const usersTest = require("../controllers/usersTest");

const router = express.Router();

router.use("/auth", authTest);
router.use("/login", login);
router.use("/registration", registration);
// router.route("/test").get(usersTest.returnUsers);

module.exports = router;
