const express = require('express');
const authTest = require('./authTest');
const login = require('./login');
const registration = require('./registration');
const getProfileData = require('./getProfileData');
const updateUserProfile = require('./updateUserProfile');

const router = express.Router();

router.use('/auth', authTest);
router.use('/login', login);
router.use('/registration', registration);
router.use('/getProfileData', getProfileData);
router.use('/updateUserProfile', updateUserProfile);

// router.get('/test', (req, res) => {
//   try {
//     const result = {};

//     return res.json(result);
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// });

module.exports = router;
