const mandrillClient = require('../config/mandrillClient');

function emailTemplate(templateName, subject, email, vars) {
  mandrillClient.messages.sendTemplate(
    {
      template_name: templateName,
      template_content: [],
      message: {
        subject,
        from_email: 'support@sendsteps.com',
        to: [
          {
            email,
            type: 'to'
          }
        ],
        global_merge_vars: vars
      },
      async: false
    },
    result => {
      console.log(result);
    },
    e => {
      console.log(`'A mandrill error occurred: ${e.name} - ${e.message}`);
    }
  );
}

module.exports = emailTemplate;
