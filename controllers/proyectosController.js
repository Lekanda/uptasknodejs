const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    // console.log(proyectos);
    res.render('index', {
        nombrePagina: 'Proyectos '+ res.locals.year,
        proyectos
    });
}
exports.formularioProyecto = async(req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevo-proyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}
exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    // res.send('Enviaste el formulario');

    // Enviar a consola lo que el usuario escriba
    // console.log(req.body.nombre);

    // Validar que tenga algo en el input
    const nombre = req.body.nombre;
    let errores = [];
    if(!nombre || nombre === '') {
        errores.push({'texto':'Agrega un Nombre al Proyecto'});
    }
    
    // Si hay errores
    if(errores.length > 0 ){
        res.render('nuevo-proyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores, Insertar en la DB
            await Proyectos.create({ nombre });
            res.redirect('/');
            // .then(() => console.log('Insertado Correctamente'))
            // .catch(error => console.log(error))
    }
}

exports.proyectoPorUrl = async(req,res,next) => {
    // res.send('Listo');
    // res.send(req.params.url);
    const proyectos = await Proyectos.findAll();

    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    if(!proyecto) return next();

    // console.log(proyecto);
    // res.send('Ok');
    
    // Render a la Vista
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}

exports.formularioEditar = async(req,res) => {
    const proyectosPromise =  Proyectos.findAll();

    const proyectoPromise =  Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    // Render a la vista
    res.render('nuevo-proyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    // console.log(req.body.nombre);

    // Validar que tenga algo en el input
    const nombre = req.body.nombre;
    let errores = [];
    if(!nombre || nombre === '') {
        errores.push({'texto':'Agrega un Nombre al Proyecto'});
    }
    
    // Si hay errores
    if(errores.length > 0 ){
        res.render('nuevo-proyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        // No hay errores, Insertar en la DB
            await Proyectos.update(
                { nombre: nombre },
                { where: { id: req.params.id }}
            );
            res.redirect('/');
    }
}