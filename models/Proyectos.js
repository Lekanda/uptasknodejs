const Sequelize = require('sequelize');
const slug = require('slug');


const db = require('../config/db');

const Proyectos = db.define('proyectos', 
 {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(100),
    url: Sequelize.STRING(100)
 }, 
 {
    hooks: {
        beforeCreate(proyecto){
            console.log('Antes de Insertar en la DB');
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url= url;
        }
    }
 }
);

module.exports = Proyectos;