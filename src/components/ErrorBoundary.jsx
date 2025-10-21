const ErrorBoundary = ({ children, error, onRetry }) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-800 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-red-700 mb-6 text-lg">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button 
          onClick={onRetry} 
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;