const emailTemplate = require('./emailTemplate');

function sendGreetingsEmail(email, firstName) {
  const templateName = 'free-account-in-add-in';
  const subject = 'Welcome to sendsteps!';
  const vars = [
    {
      name: 'BRANDNAME',
      content: 'KEENETHICS'
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
