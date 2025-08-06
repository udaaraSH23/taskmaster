import { Request, Response } from 'express';
import { TaskModel } from '../model/task.nodel';

export const getTodayTasks = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasks = await TaskModel.find({ createdAt: { $gte: today } }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching today\'s tasks', error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const newTask = new TaskModel(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updated = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deleted = await TaskModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error });
  }
};
