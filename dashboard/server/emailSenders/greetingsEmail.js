const emailTemplate = require('./emailTemplate');

function sendGreetingsEmail(email, firstName) {
  const templateName = 'free-account-in-add-in';
  const subject = 'Welcome to sendsteps!';
  const vars = [
    {
      name: 'BRANDNAME',
      // TODO this should be taken from addinsettings table, column name, but I'm not sure how...
      content: 'Sendsteps'
    },
    {
      name: 'FIRSTNAME',
      content: firstName
    },
    {
      name: 'URL_BRANDED_DOWNLOAD',
      content: 'https://google.com'
    }
  ];
  
  emailTemplate(templateName, subject, email, vars);
}

module.exports = {
  sendGreetingsEmail
};
