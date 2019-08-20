const express = require('express');
const checkJWT = require('../middlewares/checkJWT');
const {
  getSites,
  getSiteById,
  editSite
} = require('../controllers/editLayout');

const router = express.Router();

router.route('/getSites').post(checkJWT(), getSites);
router.route('/getSiteById').post(checkJWT(), getSiteById);
router.route('/editSite').post(checkJWT(), editSite);

module.exports = router;
