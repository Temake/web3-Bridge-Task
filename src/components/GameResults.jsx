const GameResults = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Excellent! 🎉", color: "text-green-600" };
    if (percentage >= 70) return { message: "Good Job! 👍", color: "text-blue-600" };
    if (percentage >= 50) return { message: "Not Bad! 👌", color: "text-yellow-600" };
    return { message: "Keep Practicing! 💪", color: "text-orange-600" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="text-center space-y-6 animate-bounce-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
      
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="text-5xl font-bold text-blue-600">
          {score}/{totalQuestions}
        </div>
        <div className="text-3xl font-semibold text-gray-700">
          {percentage}%
        </div>
        <div className={`text-xl font-medium ${performance.color}`}>
          {performance.message}
        </div>
      </div>
      
      <button 
        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={onRestart}
      >
        Play Again
      </button>
    </div>
  );
};

export default GameResults;