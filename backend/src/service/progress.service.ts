import { TaskModel } from "../model/task.nodel";

/**
 * Get progress (task completion rate) for each of the past 30 days.
 */
export const getUserProgressLast30Days = async (userId: string) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 29); // inclusive of today

  const tasks = await TaskModel.find({
    user: userId,
    date: {
      $gte: startDate.toISOString().split('T')[0],
      $lte: endDate.toISOString().split('T')[0],
    },
  });

  // Group by date
  const progressMap: Record<string, { total: number; completed: number }> = {};

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    progressMap[dateStr] = { total: 0, completed: 0 };
  }

  tasks.forEach(task => {
    const dateStr = task.date;
    if (progressMap[dateStr]) {
      progressMap[dateStr].total += 1;
      if (task.completed) {
        progressMap[dateStr].completed += 1;
      }
    }
  });

  // Format for response
  return Object.entries(progressMap).map(([date, data]) => ({
    date,
    completionRate: data.total === 0 ? 0 : data.completed / data.total,
    totalTasks: data.total,
    completedTasks: data.completed,
  }));
};
