const Usuarios = require('../models/Usuarios');

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
