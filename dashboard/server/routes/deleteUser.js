const express = require('express');
const { deleteUser } = require('../controllers/deleteUser');
const checkJWT = require('../middlewares/checkJWT');

const router = express.Router();

router.route('/').post(checkJWT(), deleteUser);

module.exports = router;
