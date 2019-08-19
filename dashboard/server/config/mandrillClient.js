const mandrill = require('mandrill-api/mandrill');
require('dotenv-safe').config({ allowEmptyValues: true });

const MANDRILL_API_KEY = process.env.MANDRILL_API_KEY;

const mandrillClient = new mandrill.Mandrill(MANDRILL_API_KEY);

module.exports = mandrillClient;
