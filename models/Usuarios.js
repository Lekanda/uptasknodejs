const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcryptNode = require('bcrypt-nodejs');
const bcrypt = require('bcrypt');


const Usuarios = db.define('usuarios', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    email : {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail:{
                msg : 'Agrega un E-Mail Valido'
            },
            notEmpty:{
                msg: 'El eMail no puede ir vacio'
            }
        },
        unique: {
                args : true,
                msg : 'Usuario ya Registrado'
        },
    },

    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'El Password no puede ir vacio'
            }
        }
    },
    activo:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
}, {
    hooks:{
        beforeCreate(usuario) {
            // console.log('Creando un nuevo Usuario');
            // console.log(usuario);
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10) );
        }
    }
});

// Metodos Personalizados
Usuarios.prototype.verificarPassword = function (password) {
    console.log(Usuarios.prototype);
    
    return bcrypt.compareSync(password, this.password);
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;