import { useState } from "react";
import type { Task } from "../pages/Home";


interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = () => {
    onEdit(task.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
      <div className="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4"
        />
        {isEditing ? (
          <input
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded w-full"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSubmit();
            }}
          />
        ) : (
          <span
            className={`flex-1 ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.text}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleEditSubmit}
            className="text-green-500 hover:text-green-700"
          >
            ✅
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-500 hover:text-yellow-600"
          >
            📝
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
