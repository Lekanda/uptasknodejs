const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

// // create reusable transporter object using the default SMTP transport
// let transport = nodemailer.createTransport({
//     host: emailConfig.host,
//     port: emailConfig.port,
//     auth: {
//       user: emailConfig.user, // generated ethereal user
//       pass: emailConfig.pass // generated ethereal password
//     }
//   });

//   let info = transport.sendMail({
//     from: 'UpTask <no-reply@uptask.com>', // sender address
//     to: "abernaolao@gmail.com", // list of receivers
//     subject: "Password Reset ", // Subject line
//     text: "Hello", // plain text body
//     html: "<b>hola este es el mail</b>" // html body
//   });

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: emailConfig.user, // generated ethereal user
        pass: emailConfig.pass // generated ethereal password
      }
    });

    // Generar HTML
    const generarHTML = () =>{
        const html = pug.renderFile(`${__dirname}/../views/emails/reestablecer-password.pug`);
        return juice(html);
    }
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"UpTask 👻" <no-reply@uptask.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hola ✔", // Subject line
      text: "Hello que tal", // plain text body
      html: generarHTML() // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);