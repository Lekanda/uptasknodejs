const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

// create reusable transporter object using the default SMTP transport
let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.pass // generated ethereal password
    }
  });

  let info = transport.sendMail({
    from: 'UpTask <no-reply@uptask.com>', // sender address
    to: "abernaolao@gmail.com", // list of receivers
    subject: "Password Reset ", // Subject line
    text: "Hello", // plain text body
    html: "<b>hola este es el mail</b>" // html body
  });

