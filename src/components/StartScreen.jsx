const StartScreen = ({ onStart, questionCount = 10 }) => {
  return (
    <div className="text-center space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome to the Quiz!
        </h2>
        <p className="text-lg text-gray-600">
          Test your knowledge with {questionCount} random questions from various topics.
        </p>
      </div>

      {/* Game Rules */}
      <div className="bg-blue-50 rounded-lg p-6 text-left space-y-3">
        <h3 className="font-semibold text-blue-800 mb-3">Game Rules:</h3>
        <ul className="text-blue-700 space-y-2">
          <li className="flex items-center">
            <span className="mr-2">📝</span>
            Answer {questionCount} multiple-choice questions
          </li>
          <li className="flex items-center">
            <span className="mr-2">⏱️</span>
            No time limit - take your time to think
          </li>
          <li className="flex items-center">
            <span className="mr-2">📊</span>
            Get instant feedback after each answer
          </li>
          <li className="flex items-center">
            <span className="mr-2">🏆</span>
            See your final score and performance
          </li>
        </ul>
      </div>

      {/* Start Button */}
      <button 
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
        onClick={onStart}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;