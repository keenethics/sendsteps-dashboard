const express = require('express');
const login = require('./login');
const registration = require('./registration');
const getProfileData = require('./getProfileData');
const updateUserProfile = require('./updateUserProfile');
const deleteUser = require('./deleteUser');
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/login', login);
router.use('/registration', registration);
router.use('/getProfileData', getProfileData);
router.use('/updateUserProfile', updateUserProfile);
router.use('/deleteUser', deleteUser);
router.use('/user', userRoutes);

router.get('/test', async (req, res) => {
  // TODO clean this method in production

  return res.json({ req });
});

module.exports = router;
