import { Router } from 'express';
import {
  getTodayTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controller/task.controller';

const router = Router();

router.get('/today', getTodayTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
