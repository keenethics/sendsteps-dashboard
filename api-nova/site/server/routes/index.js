const express = require('express');
const login = require('./login');
const registration = require('./registration');
const getProfileData = require('./getProfileData');
const updateUserProfile = require('./updateUserProfile');
const deleteUser = require('./deleteUser');
const userRoutes = require('./userRoutes');
const getDownloadAddInUrl = require('./getDownloadAddInUrl');
const checkGuidedTour = require('./checkGuidedTour');
const takeGuidedTour = require('./takeGuidedTour');
const audienceIdentification = require('./audienceIdentification');
const tabreact = require('./tabreact');

const test = require('./test');


const router = express.Router();

router.use('/login', login);
router.use('/registration', registration);
router.use('/getProfileData', getProfileData);
router.use('/updateUserProfile', updateUserProfile);
router.use('/deleteUser', deleteUser);
router.use('/user', userRoutes);
router.use('/getDownloadAddInUrl', getDownloadAddInUrl);
router.use('/checkGuidedTour', checkGuidedTour);
router.use('/takeGuidedTour', takeGuidedTour);
router.use('/identification', audienceIdentification);
router.use('/tabreact', tabreact);

// router.post('/test', (req, res) => {
//   // TODO clean this method in production
//
//   // return res.json(req.body);
// });

// TODO clean this method in production
router.use('/test', test);

module.exports = router;
