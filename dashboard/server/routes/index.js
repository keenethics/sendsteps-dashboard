const express = require('express');
const authTest = require('./authTest');
const login = require('./login');
const registration = require('./registration');
const getProfileData = require('./getProfileData');
const updateUserProfile = require('./updateUserProfile');
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

const router = express.Router();

router.use('/auth', authTest);
router.use('/login', login);
router.use('/registration', registration);
router.use('/getProfileData', getProfileData);
router.use('/updateUserProfile', updateUserProfile);

router.get('/test', async (req, res) => {
  try {
    const result = { result: 'OK' };

    try {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      const testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass // generated ethereal password
        }
      });

      ejs.renderFile(
        path.join(__dirname, '../emailTemplates/index.ejs'),
        {
          BRANDNAME: 'KEENETHICS',
          FIRST_NAME: 'Nazar',
          URL_BRANDED_DOWNLOAD: 'https://google.com'
        },
        async function(err, data) {
          if (err) {
            console.log(err);
          } else {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: '"Test server 👻👻👻" <foo@example.com>',
              to: 'nazargorokhivskiy@gmail.com',
              subject: 'Hello ✔',
              text: 'Hello world?',
              html: data
            });

            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          }
        }
      );
    } catch (error) {
      console.error(error);
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
