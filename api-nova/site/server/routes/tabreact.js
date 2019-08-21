const express = require('express');

const tabreact = require('../controllers/tabreact');
const checkJWT = require('../middlewares/checkJWT');
const getLastSession = require('../middlewares/getLastSession');

const router = express.Router();

router.get(
  '/',
  checkJWT(),
  getLastSession,
  tabreact.getData
);

router.route('/update').post(
  checkJWT(),
  tabreact.validateUpdate,
  getLastSession,
  tabreact.setData,
);

module.exports = router;
