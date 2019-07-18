const express = require('express');
const authTest = require('./authTest');


const router = express.Router();

router.use('/auth', authTest);

module.exports = router;

