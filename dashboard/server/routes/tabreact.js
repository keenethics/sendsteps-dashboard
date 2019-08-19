const express = require("express");
const tabreact = require("../controllers/tabreact");
const checkJWT = require('../middlewares/checkJWT');
const getLastSession = require('../middlewares/getLastSession');

const router = express.Router();

router.route("/").get(
  checkJWT(),
  getLastSession,
  tabreact.getData
);

module.exports = router;
