interface Props {
    completed: number;
    total: number;
  }
  
  export const ProgressBar = ({ completed, total }: Props) => {
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  
    return (
      <div className="mt-4">
        <p className="mb-1 text-sm">
          {completed} of {total} tasks completed
        </p>
        <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded-full">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };
  