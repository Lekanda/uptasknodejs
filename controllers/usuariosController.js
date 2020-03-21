const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req,res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear Cuenta en Uptask'
    })
}

exports.crearCuenta = (req,res) => {
    // res.send('Enviaste el formulario');
    // **Leer los Datos**
    // console.log(req.body);
    const { email, password } = req.body;
    
    //crear el usuario
    Usuarios.create({
        email,
        password
    })
    .then(() => {
        res.redirect('/iniciar-sesion')
    })
}