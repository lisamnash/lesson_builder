type LoadingSpinnerProps = {
  message?: string;
};

export function LoadingSpinner({ message = "Loading your learning journey..." }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="space-y-4 text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent 
                        rounded-full animate-spin mx-auto animate-pulse-slow">
        </div>
        <p className="text-gray-600 dark:text-gray-400 animate-bounce-slow">{message}</p>
      </div>
    </div>
  );
} 