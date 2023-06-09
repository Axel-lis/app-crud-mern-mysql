//importamos el Model
import models from '../models/UsuarioModel.js';

const Usuario = models.UsuarioModel;
const TareaModel = models.TareaModel;

//**Metodos para el CRUD **//

//Mostrar todos los registros
export const getAllTareas = async (req, res) => {
  try {
    // Obtén el ID del usuario autenticado desde la sesión
    const userId = req.session.userId;

    // Busca todas las tareas que pertenezcan al usuario
    const tareas = await TareaModel.findAll({
      where: { userId: userId },
    });

    res.json(tareas); // Envía las tareas como respuesta
  } catch (error) {
    res.json({ message: error.message });
  }
};

  
//Mostrar un registro
export const getTarea = async (req, res) =>{
    try{
        const tarea = await TareaModel.findAll({
            where: {id: req.params.id}
        })
        res.json(tarea[0])
    }catch(error){
        res.json({message: error.message})
    }
}
//Crear un registro
export const createTarea = async (req, res) => {
  try {
    // Obtén el ID del usuario autenticado desde la sesión
    const userId = req.session.userId;

    // Crea la tarea con el ID del usuario
    await TareaModel.create({ ...req.body, userId });

    res.json({
      message: "¡Registro creado correctamente!"
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Actualizar un registro
export const updateTarea = async (req, res) => {
    try {
      await TareaModel.update(req.body, {
        where: { id: req.params.id },
      });
      res.json({
        message: "¡Registro actualizado correctamente!",
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  
//Eliminar un registro
export const deleteTarea = async (req, res) =>{
    try{
        await TareaModel.destroy({
            where: { id: req.params.id}
        })
        res.json({
            "message": "Registro eliminado correctamente"
        })
    }catch(error){
        res.json({message: error.message})
    }
}
 // traer tareas para el calendario
 export const getAllTareasCalendar = async (req, res) => {
  try {
    // Obtén el ID del usuario autenticado desde la sesión
    const userId = req.session.userId;

    // Busca todas las tareas que pertenezcan al usuario
    const tareas = await TareaModel.findAll({
      where: { userId: userId },
    });

    // Crea un arreglo de eventos a partir de las tareas encontradas
    const eventos = tareas.map((tarea) => ({
      id: tarea.id,
      title: tarea.title,
      start: tarea.dateinicio,
      end: tarea.datefin,
      description: tarea.description,
    }));

    res.json(eventos); // Envía la respuesta como JSON al cliente
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
};


