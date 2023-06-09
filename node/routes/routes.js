import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserLogin
} from '../controllers/UsuariosController.js';
import { createTarea, deleteTarea, getAllTareas, getAllTareasCalendar, getTarea, updateTarea } from '../controllers/TareasController.js';
const router = express.Router();

//rutas login registro
router.post('/register', registerUser);
router.get('/login', getUserLogin);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/calendar', getAllTareasCalendar); // Ruta para obtener las tareas del calendario
router.get('/:id', getTarea); // Ruta para obtener una tarea por su ID
router.get('/', getAllTareas); // Ruta para obtener todas las tareas
router.post('/', createTarea); // Ruta para crear una tarea
router.put('/:id', updateTarea); // Ruta para actualizar una tarea
router.delete('/:id', deleteTarea); // Ruta para eliminar una tarea



export default router;
