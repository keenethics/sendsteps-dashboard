const express = require("express");
const login = require("./login");
const registration = require("./registration");
const getProfileData = require('./getProfileData');
const updateUserProfile = require('./updateUserProfile');
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/login", login);
router.use("/registration", registration);
router.use('/getProfileData', getProfileData);
router.use('/updateUserProfile', updateUserProfile);

router.use("/user", userRoutes);

module.exports = router;
