const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const {
  getSites,
  getSiteById
} = require('../controllers/editLayout');

const router = express.Router();

router.route('/getSites').post(checkJWT(), getSites);
router.route('/getSiteById').post(checkJWT(), getSiteById);

module.exports = router;
