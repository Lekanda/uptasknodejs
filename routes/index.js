const express = require('express');
const router = express.Router();

// Importamos Express Validator
const { body } = require('express-validator');

// importar el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function() {
    // Ruta para el Home
    router.get('/', proyectosController.proyectosHome);
    // Rutas para nuevo proyecto
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
    // Actualizar estado de Tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
    //Eliminar Tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea);
    // Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    //Iniciar Sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    return router;
}