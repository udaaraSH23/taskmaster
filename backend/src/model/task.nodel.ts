import { Schema, model, Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

const TaskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const TaskModel = model<Task>('Task', TaskSchema);
