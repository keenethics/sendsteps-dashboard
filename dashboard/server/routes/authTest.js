const express = require('express');
const authTest = require('../controllers/authTest');


const router = express.Router();

router.route('/test')
  .get(
    authTest.returnTestData,
  );


module.exports = router;

