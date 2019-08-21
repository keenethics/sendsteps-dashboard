const express = require('express');
const { check } = require('../controllers/guidedTour');
const checkJWT = require('../middlewares/checkJWT');

const router = express.Router();

router.route('/').post(checkJWT(), check);

module.exports = router;
