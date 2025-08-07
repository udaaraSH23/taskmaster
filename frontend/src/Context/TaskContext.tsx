import  React, { createContext, useContext, useState, ReactNode } from "react";

import type { Task } from "../types/Task";

interface TaskContextType {
  tasks: Task[];
  addTask: (newTask:Task) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Buy groceries",
      description:"sdsds",
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Finish React project",
      description:"sdsds",
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const addTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };
  

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id: number, newText: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, toggleTask, editTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
