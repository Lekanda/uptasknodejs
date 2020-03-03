const Proyectos = require('../models/Proyectos');

exports.proyectosHome = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
}
exports.formularioProyecto = (req, res) => {
    res.render('nuevo-proyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });
}
exports.nuevoProyecto = async (req, res) => {
    // res.send('Enviaste el formulario');

    // Enviar a consola lo que el usuario escriba
    console.log(req.body.nombre);

    // Validar que tenga algo en el input
    const nombre = req.body.nombre;

    let errores = [];
    if(!nombre) {
        errores.push({'texto':'Agrega un Nombre al Proyecto'});
    }
    
    // Si hay errores
    if(errores.length>0) {
        console.log(nombre);
        res.render('nuevo-proyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    } else {
        // No hay errores, Insertar en la DB
            
            const proyecto = await Proyectos.create({ nombre });
            res.redirect('/');
            // .then(() => console.log('Insertado Correctamente'))
            // .catch(error => console.log(error))
        }
}