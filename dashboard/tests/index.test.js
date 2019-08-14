process.env.NODE_ENV = 'test';
process.env.API_BASE = '/api';
process.env.APP_PORT = 3006;

const sinon = require('sinon');
const forgotPasswordEmail = require('../server/emailSenders/forgotPasswordEmail');
const greetingsEmail = require('../server/emailSenders/greetingsEmail');
const multerFileUpload = require('../server/middlewares/multerFileUpload');
const { fileIsImage } = require('../server/helpers/validationHelpers');

// Mock sendForgotEmail method
sinon.stub(forgotPasswordEmail, 'sendForgotEmail').callsFake((email, resetPasswordUrl) => {
  console.log(`Sending email to ${email} with link ${resetPasswordUrl}`);
});

// Mock sendGreetingsEmail method
sinon.stub(greetingsEmail, 'sendGreetingsEmail').callsFake((email, firstName) => {
  console.log(`Sending email to ${email}, firstName - ${firstName}...`);
});

sinon.stub(multerFileUpload, 'uploadFile').callsFake((req, res, next) => {
  if (!req.body.file) {
    return next();
  }

  if (req.body.file.fileSize > 2 * 1000 * 1000) {
    return res.status(413).json({ message: 'File is too large' });
  }

  if (!fileIsImage(req.body.file.name)) {
    return res.status(400).json({ message: 'File should be an image' });
  }

  next();
});

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const models = require('../server/models');
const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

const should = chai.should();

chai.use(chaiHttp);

const apiBase = process.env.API_BASE;

module.exports = {
  chai,
  apiBase,
  server,
  should,
  models,
  jwt
};
