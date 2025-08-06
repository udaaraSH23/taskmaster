// src/components/AddTask.tsx

import React, { useState } from "react";
import { useTasks } from "../Context/TaskContext";
import { useNavigate } from "react-router-dom";
import type { Task } from "../types/Task";

const AddTask: React.FC = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask:Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);
    navigate("/"); // return to task list
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-6">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 dark:text-blue-300 mb-4 text-sm"
        >
          ← Back to Tasks
        </button>

        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1 text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
              placeholder="e.g., Finish UI design"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
              placeholder="Optional details..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded border text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
