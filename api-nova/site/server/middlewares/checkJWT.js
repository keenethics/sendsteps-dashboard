const jwt = require('express-jwt');
// for using .env variables
require("dotenv-safe").config();

module.exports = () => jwt({ secret: process.env.JWT_PRIVATE_KEY });