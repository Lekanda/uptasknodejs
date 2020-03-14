const express = require('express');
const router = express.Router();

// Importamos Express Validator
const { body } = require('express-validator');

// importar el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

module.exports = function() {
    // Ruta para el Home
    router.get('/', proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);

    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );
    // Listar Proyecto
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
    // Actualizar el Proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    // 
    router.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );
    // Eliminar Proyecto
    router.delete('/proyectos/:url', proyectosController.eliminarProyecto);
    //Tareas Nuevas
    router.post('/proyectos/:url' , tareasController.agregarTarea);

    return router;
}