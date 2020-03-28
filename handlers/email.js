const nodemailer = require('nodemailer');
const pug = require('pug');//convertir un template existente y convert a mail
const juice = require('juice');// Agrega estilos lineales CSS
const htmlToText = require('html-to-text');//Version de HTML a Texto
const util = require('util');// Para que acepte ASYNC
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

// Generar HTML
const generarHTML = (archivo, opciones = {}) =>{
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html);
}

exports.enviar = async (opciones) => {
  const html = generarHTML(opciones.archivo, opciones );
  const text = htmlToText.fromString(html);
  let opcionesEmail = {
      from: 'UpTask <no-reply@uptask.com>',
      to: opciones.usuario.email, 
      subject: opciones.subject,
      text, 
      html
  };

  const enviarEmail = util.promisify(transport.sendMail, transport);
  return enviarEmail.call(transport, opcionesEmail)
}
