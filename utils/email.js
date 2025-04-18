const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1 create a transporter
  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2 define the email options
  const mailOptions = {
    from: 'Felipe Medina <felipemedina.developer@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3 actually send the email
  await transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error sending email', err);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};
module.exports = sendEmail;
