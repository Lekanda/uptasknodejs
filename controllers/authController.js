const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const enviarEmail = require('../handlers/email');


exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});

// Funcion para saber sí el usuario esta logeado o no
exports.usuarioAutenticado = (req,res,next) => {
    // Sí el usuario esta autenticado adelante
    if(req.isAuthenticated()) {
        return next();
    }
    // Sí no esta Autenticado, redirigir al formulario
    return res.redirect('/iniciar-sesion');
};

//Funcion para cerrar sesion
exports.cerrarSesion = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');// Al cerrar sesion nos lleva al login
    })
}

// Metodo para generar un TOKEN sí el usuario es valido
exports.enviarToken = async (req,res) => {
    // Verificar que el usuario exista
    const usuario = await Usuarios.findOne({where: {email: req.body.email}});

    //Sí no existe el usuario
    if(!usuario) {
        req.flash('error', 'No existe esa Cuenta');
        res.redirect('/reestablecer');
    }

    // El Usuario Existe. Genera TOKEN
    usuario.token = crypto.randomBytes(20).toString('hex');
    // expiracion
    usuario.expiracion = Date.now() + 3600000;// 1 hora
    // console.log(token);
    // console.log(expiracion);

    //***Guardar en la DB */
    await usuario.save();

    // URL de Reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

    // Envia el Correo con el Token
    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'reestablecer-password'
    });
    // Terminar
    req.flash('correcto', 'Se Envio un mensaje a tu Correo');
    res.redirect('/iniciar-sesion');

    // res.redirect(resetUrl);// CUIDADO puesto por mi
    // console.log(resetUrl);
}

//Resetear Password
exports.validarToken = async (req,res) => {
    const usuario = await Usuarios.findOne({
        where:{
            token: req.params.token
        }
    });

    // Si no encuentra el Usuario
    if(!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/reestablecer');
    }

    // Formulario para Generar el Password
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer Contraseña'
    })
    console.log(usuario);
}

// Metodo que Cambia el Password por uno Nuevo
exports.actualizarPassword = async (req,res) => {
    // Verifica el Token Valido perotambienla fecha de expiracion
    console.log(req.params.token);
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte]: Date.now() 
            }
        }
    });

    // Verificamos sí el usuario existe
    // console.log(usuario);
    if(!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/reestablecer');
    }

    // Hashear el Password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10) );
    usuario.token = null;
    usuario.expiracion = null;

    // Guardamos el nuevo 
    await usuario.save();
    req.flash('correcto', 'Tu Password se ha modficado correctamente');
    res.redirect('/iniciar-sesion');
}