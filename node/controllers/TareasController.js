//importamos el Model
import TareaModel from "../models/TareaModel.js";

//**Metodos para el CRUD **//

//Mostrar todos los registros
export const getAllTareas = async (req, res) => {
    try {
      const tareas = await TareaModel.findAll();
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
export const createTarea = async (req, res) =>{
    try{
        await TareaModel.create(req.body)
        res.json({
            "message":"Registro creado correctamente!"
        })
    }catch(error){
        res.json({message: error.message})
    }
}
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
    const tareas = await TareaModel.findAll();
    const eventos = tareas.map((tarea) => ({
      id: tarea.id,
      title: tarea.title,
      start: tarea.dateinicio,
      end: tarea.datefin,
      description: tarea.description
    }));
    res.json(eventos); // Envía la respuesta como JSON al cliente
  } catch (error) {
    res.json({ message: error.message });
    console.log(error);
  }
};


