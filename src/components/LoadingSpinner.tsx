export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-dark-700 border-t-primary-500 border-r-accent-500"></div>
        <div className="absolute inset-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-l-primary-400 border-b-accent-400" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
    </div>
  );
}

