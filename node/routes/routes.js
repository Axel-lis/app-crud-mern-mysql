import express from 'express';
import { checkLoggedIn } from '../controllers/authController.js';
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


router.get('/calendar', checkLoggedIn, getAllTareasCalendar); // Ruta para obtener las tareas del calendario
router.get('/:id', checkLoggedIn, getTarea); // Ruta para obtener una tarea por su ID
router.get('/', checkLoggedIn, getAllTareas); // Ruta para obtener todas las tareas
router.post('/', checkLoggedIn, createTarea); // Ruta para crear una tarea
router.put('/update/:id', checkLoggedIn, updateTarea); // Ruta para actualizar una tarea
router.delete('/delete/:id', checkLoggedIn, deleteTarea); // Ruta para eliminar una tarea


export default router;
