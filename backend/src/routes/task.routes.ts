import { Router } from 'express';
import {
  getTodayTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controller/task.controller';

const router = Router();

router.get('/test', (req, res) => {
  res.send('Task route is working');
});


router.get('/today', getTodayTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
