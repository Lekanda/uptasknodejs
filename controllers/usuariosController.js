const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req,res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear Cuenta en Uptask'
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
            nombrePagina : 'Crear Cuenta en Uptask'
        })
    }
}
