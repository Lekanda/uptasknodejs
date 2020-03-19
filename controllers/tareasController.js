const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req,res,next) =>{
    // Obtenemos el Proyecto actual
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}});
    // console.log(proyecto);
    // console.log(req.body);
    // Leer el valor del Input
    const {tarea} = req.body;
    // estado 0 = Incompleto y ID de Proyecto
    const estado = 0;// Al añadir x defec incompleta
    const proyectoId = proyecto.id;

    // Insertar en la DB.Los datos en el mismo orden que la tabla de la DB(tareas)
    const resultado = await Tareas.create({ tarea, estado, proyectoId});

    if(!resultado ){// Sí no hay resultado continua con lo siguiente
        return next();
    }
    // Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req,res,next)=> {
    // console.log(req.params);
    const { id } = req.params;
    const tarea = await Tareas.findOne({where: { id: id }});
    // console.log(tarea);
    // Cambiar el Estado
    let estado = 0;
    if(tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;
    const resultado = await tarea.save();

    if (!resultado) {
        return next();
    }
    
    res.status(200).send('Actualizado....');
}

exports.eliminarTarea = async (req,res)=> {
    console.log(req.query);
    console.log(req.params);
    
    const { id } = req.params;
    //Eliminar la Tarea
    const resultado = await Tareas.destroy({where: {id}});
    if (!resultado) {
        return next();
    }

    res.status(200).send('Tarea Eliminado');
}