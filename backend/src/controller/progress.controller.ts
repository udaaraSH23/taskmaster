import { Request, Response } from 'express';
import { ProgressModel } from '../model/progress.model';

export const getLast30DaysProgress = async (_req: Request, res: Response) => {
  try {
    const today = new Date();
    const past30 = new Date(today);
    past30.setDate(past30.getDate() - 30);

    const progress = await ProgressModel.find({ date: { $gte: past30 } }).sort({ date: -1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress data', error });
  }
};
