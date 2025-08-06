import { Schema, model, Document } from 'mongoose';

export interface Progress extends Document {
  date: Date;             // day like 2025-08-06
  totalTasks: number;
  completedTasks: number;
  createdAt: Date;
}

const ProgressSchema = new Schema<Progress>({
  date: { type: Date, required: true },
  totalTasks: { type: Number, required: true },
  completedTasks: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ProgressModel = model<Progress>('Progress', ProgressSchema);
