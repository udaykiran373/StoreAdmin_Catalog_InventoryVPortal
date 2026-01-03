interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="card p-8 text-center border-red-500/30 bg-red-900/20">
      <div className="text-red-400 mb-4">
        <svg
          className="mx-auto h-16 w-16 text-red-400 drop-shadow-glow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="mt-4 font-bold text-xl text-white">Error loading data</p>
        <p className="text-sm mt-2 text-red-300">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-glow transform hover:scale-105"
        >
          Retry
        </button>
      )}
    </div>
  );
}

