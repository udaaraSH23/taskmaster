// utils/cron.ts
import cron from 'node-cron';
import { TaskModel } from '../model/task.nodel';
import { ProgressModel } from '../model/progress.model';

export const startDailyResetJob = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Running daily reset...');

    const today = new Date();
    const dateOnly = new Date(today.toDateString()); // remove time

    try {
      const allTasks = await TaskModel.find({});
      const totalTasks = allTasks.length;
      const completedTasks = allTasks.filter(task => task.completed).length;

      // Save today's progress
      await ProgressModel.create({
        date: dateOnly,
        totalTasks,
        completedTasks,
        createdAt: new Date(),
      });

      // Reset all tasks to incomplete
      await TaskModel.updateMany({}, { completed: false });

      console.log('[CRON] Daily reset completed successfully.');
    } catch (error) {
      console.error('[CRON] Error during daily reset:', error);
    }
  });
};
