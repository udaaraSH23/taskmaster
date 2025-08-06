import { useState } from "react";
import { TaskItem } from "../Components/TaskItem.tsx";
import { Navbar } from "../Components/Navbar.tsx";
import { ProgressBar } from "../Components/ProgressBar.tsx";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Buy groceries", completed: true },
    { id: 2, text: "Finish React project", completed: false },
    { id: 3, text: "Review pull requests", completed: false },
  ]);

  const handleToggle = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEdit = (id: number, newText: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Today's Tasks</h1>
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>

        <div className="mt-6">
          <ProgressBar completed={completedCount} total={tasks.length} />
        </div>
      </div>
    </div>
  );
}
