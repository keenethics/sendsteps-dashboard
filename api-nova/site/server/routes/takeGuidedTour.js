const express = require('express');
const { takeTour } = require('../controllers/guidedTour');
const checkJWT = require('../middlewares/checkJWT');

const router = express.Router();

router.route('/').post(checkJWT(), takeTour);

module.exports = router;
