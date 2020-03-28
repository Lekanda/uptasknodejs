const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = (req,res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear Cuenta en Uptask'
    })
}

exports.formIniciarSesion = (req,res) => {
    // console.log(res.locals.mensajes);
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina : 'Iniciar Sesion en UpTask',
        error
    })
}

exports.crearCuenta = async(req,res) => {
    // res.send('Enviaste el formulario');
    // **Leer los Datos**
    // console.log(req.body);
    const { email, password } = req.body;
    try {
        // Crear el Usuario
        await Usuarios.create({
              email,
              password
        });

        // Crear una URL de confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        // Crear el Objeto de Usuario
        const usuario = {
            email
        }
        // Enviar eMail
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu Cuenta UpTask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });
        // Redirigir al Usuario
        req.flash('correcto', 'Te hemos enviado un correo de confirmacion, revisa tu eMail por favor');
        res.redirect('/iniciar-sesion');

        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina : 'Crear Cuenta en Uptask',
            email: email,
            password
        })
    }
}

exports.formRestablecerPassword = (req,res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu Contraseña'
    })
}

//Cambia el estado de una cuenta
exports.confirmarCuenta = async (req,res) => {
    // res.json(req.params.correo);
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    });
    // Sí no existe el Usuario
    if(!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/crear-cuenta');
    }
    usuario.activo=1;
    await usuario.save();
    req.flash('correcto', 'Cuenta activada');
    res.redirect('/iniciar-sesion');
}
