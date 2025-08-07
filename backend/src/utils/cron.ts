import cron from 'node-cron';
import { TaskModel } from '../model/task.nodel';
import { ProgressModel } from '../model/progress.model';

export const startDailyResetJob = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Running daily reset...');

    const today = new Date();
    const todayDateOnly = new Date(today.toDateString());

    try {
      // Fetch all tasks older than today
      const oldTasks = await TaskModel.find({
        date: { $lt: todayDateOnly }
      });

      if (oldTasks.length === 0) {
        console.log('[CRON] No old tasks to process, nothing to reset.');
        return;
      }

      // Group tasks by their date (ISO string for grouping key)
      const groupedTasks = oldTasks.reduce<Record<string, typeof oldTasks>>((groups, task) => {
        const day = task.date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        if (!groups[day]) groups[day] = [];
        groups[day].push(task);
        return groups;
      }, {});

      // Process each group (each missed day)
      for (const day in groupedTasks) {
        const tasksForDay = groupedTasks[day];
        const totalTasks = tasksForDay.length;
        const completedTasks = tasksForDay.filter(task => task.completed).length;

        // Save progress for that day
        await ProgressModel.create({
          date: new Date(day),
          totalTasks,
          completedTasks,
          createdAt: new Date(),
        });

        // Delete completed tasks for that day
        const completedIds = tasksForDay
          .filter(task => task.completed)
          .map(task => task._id);

        if (completedIds.length > 0) {
          await TaskModel.deleteMany({ _id: { $in: completedIds } });
        }

        // Update incomplete tasks' date to today
        const incompleteIds = tasksForDay
          .filter(task => !task.completed)
          .map(task => task._id);

        if (incompleteIds.length > 0) {
          await TaskModel.updateMany(
            { _id: { $in: incompleteIds } },
            { date: todayDateOnly }
          );
        }
      }

      console.log('[CRON] Daily reset processed successfully for all missed days.');

    } catch (error) {
      console.error('[CRON] Error during daily reset:', error);
    }
  });
};
