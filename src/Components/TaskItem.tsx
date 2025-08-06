import { useState } from "react";
import type { Task } from "../types/Task";
import { useTasks } from "../Context/TaskContext";

interface Props {
  task: Task;
}

export const TaskItem = ({ task }: Props) => {
  const { toggleTask, deleteTask, editTask } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleEditSubmit = () => {
    if (editText.trim() !== "") {
      editTask(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
      <div className="flex items-start gap-3 w-full">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-4 h-4 mt-1"
        />
        <div className="flex flex-col w-full">
          {isEditing ? (
            <input
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded w-full mb-1"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditSubmit();
              }}
              autoFocus
            />
          ) : (
            <>
              <span
                className={`text-base font-medium ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>

              {task.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 whitespace-pre-line">
                  {task.description}
                </p>
              )}

              {task.createdAt && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Created on: {new Date(task.createdAt).toLocaleString()}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end ml-3">
        {isEditing ? (
          <button
            onClick={handleEditSubmit}
            className="text-green-500 hover:text-green-700"
          >
            ✅
          </button>
        ) : (
          <button
            onClick={() => {
              setEditText(task.title);
              setIsEditing(true);
            }}
            className="text-yellow-500 hover:text-yellow-600"
          >
            📝
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
