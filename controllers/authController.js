const passport = require('passport');

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