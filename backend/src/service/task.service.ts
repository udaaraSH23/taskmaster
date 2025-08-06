import { TaskModel } from "../model/task.nodel";

/**
 * Get all tasks for a specific user on today's date.
 */
export const getTodayTasksByUser = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0]; // format: YYYY-MM-DD
  return await TaskModel.find({ user: userId, date: today });
};

/**
 * Create a new task.
 */
export const createTaskForUser = async (userId: string, taskData: { title: string; description?: string }) => {
  const today = new Date().toISOString().split('T')[0];
  const task = new TaskModel({ ...taskData, user: userId, date: today });
  return await task.save();
};

/**
 * Update a task by its ID and user.
 */
export const updateTaskForUser = async (userId: string, taskId: string, updates: any) => {
  return await TaskModel.findOneAndUpdate({ _id: taskId, user: userId }, updates, { new: true });
};

/**
 * Delete a task by its ID and user.
 */
export const deleteTaskForUser = async (userId: string, taskId: string) => {
  return await TaskModel.findOneAndDelete({ _id: taskId, user: userId });
};
