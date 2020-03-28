const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al modelo donde vamos a Autenticar
const Usuarios = require('../models/Usuarios');

// Local Strategy- Login con credenciales propias(usuario y password)
passport.use(
    new LocalStrategy(
        // Por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password' 
        },
        async(email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email,
                        activo: 1
                    }
                });
                // El usuario existe, pero pass incorrecto
                if(!usuario.verificarPassword(password)) {
                    return done(null,false, {
                        message: 'Password Incorrecto'
                    })
                }
                // El mail existe, y el password correcto
                return done(null, usuario);
            } catch (error) {
                //Ese Usuario no existe
                return done(null,false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    ) 
);

// Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

// Exportar 
module.exports = passport;