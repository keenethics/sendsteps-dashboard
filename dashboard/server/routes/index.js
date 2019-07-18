const express = require("express");
const authTest = require("./authTest");
const login = require("./login");
const registration = require("./registration");
const getUserData = require("./getUserData");

const router = express.Router();

router.use("/auth", authTest);
router.use("/login", login);
router.use("/registration", registration);
router.use("/getUserData", getUserData);

// router.use("/test", async (req, res) => {
//   try {
//     return res.json(req.user);
//   } catch (err) {
//     return res.status(500).send(err)
//   }
// });

module.exports = router;
