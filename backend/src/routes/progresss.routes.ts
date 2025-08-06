import { Router } from 'express';
import { getLast30DaysProgress } from '../controller/progress.controller';

const router = Router();

router.get('/30days', getLast30DaysProgress);

export default router;
