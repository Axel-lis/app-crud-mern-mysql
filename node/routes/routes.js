import express from 'express';
import { createTarea, deleteTarea, getAllTareas, getTarea, updateTarea } from '../controllers/TareasController.js';
const router = express.Router()

router.get('/', getAllTareas)
router.get('/:id', getTarea)
router.post('/', createTarea)
router.put('/:id', updateTarea)
router.delete('/:id', deleteTarea)

export default router