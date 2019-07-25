const express = require("express");
const authTest = require("./authTest");
const login = require("./login");
const registration = require("./registration");
const getUserData = require("../controllers/getUserData");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/auth", authTest);
router.use("/login", login);
router.use("/registration", registration);

router.use("/getUserData", getUserData);
router.use("/user", userRoutes);

module.exports = router;
