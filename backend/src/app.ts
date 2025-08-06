import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import taskRoutes from './routes/task.routes';
// import progressRoutes from './routes/progress.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use('/tasks', taskRoutes);
// app.use('/progress', progressRoutes);

export default app;
