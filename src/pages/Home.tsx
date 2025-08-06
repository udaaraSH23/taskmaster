import { useTasks } from "../Context/TaskContext";
import { TaskItem } from "../Components/TaskItem";
import { Navbar } from "../Components/Navbar";
import { ProgressBar } from "../Components/ProgressBar";



export default function Home() {
  const { tasks } = useTasks();

  const todayTasks = tasks.filter((t) =>
    t.createdAt?.startsWith(new Date().toISOString().split("T")[0])
  );
  const completedCount = todayTasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Today's Tasks</h1>
        <div className="space-y-3">
          {todayTasks.map((task) => (
            <TaskItem key={task.id} task={task} />

          ))}
        </div>
        <div className="mt-6">
          <ProgressBar completed={completedCount} total={todayTasks.length} />
        </div>
      </div>
    </div>
  );
}
