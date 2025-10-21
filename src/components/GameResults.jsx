const GameResults = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Simple performance message
  const getMessage = () => {
    if (percentage >= 90) return { text: "Excellent! 🎉", color: "text-green-600" };
    if (percentage >= 70) return { text: "Good Job! 👍", color: "text-blue-600" };
    if (percentage >= 50) return { text: "Not Bad! 👌", color: "text-yellow-600" };
    return { text: "Keep Practicing! 💪", color: "text-orange-600" };
  };

  const message = getMessage();

  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Quiz Complete!</h2>
      
      {/* Score Display */}
      <div className="bg-gray-50 rounded-lg p-8 space-y-4">
        <div className="text-6xl font-bold text-blue-600">
          {score}/{totalQuestions}
        </div>
        <div className="text-2xl font-semibold text-gray-700">
          {percentage}%
        </div>
        <div className={`text-xl font-medium ${message.color}`}>
          {message.text}
        </div>
      </div>
      
      {/* Performance breakdown */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <div className="text-sm text-gray-600">Correct</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{totalQuestions - score}</div>
          <div className="text-sm text-gray-600">Incorrect</div>
        </div>
      </div>
      
      {/* Play Again Button */}
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        onClick={onRestart}
      >
        Play Again
      </button>
    </div>
  );
};

export default GameResults;