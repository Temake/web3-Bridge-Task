import { useState, useEffect } from 'react';
import { saveScore, isHighScore } from '../utils/leaderboard';
import NameInputModal from './NameInputModal';
import Leaderboard from './Leaderboard';

const GameResults = ({ score, totalQuestions, onRestart }) => {
  const [showNameInput, setShowNameInput] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Check if this is a high score
  useEffect(() => {
    if (isHighScore(percentage) && !scoreSubmitted) {
      setShowNameInput(true);
    }
  }, [percentage, scoreSubmitted]);
  
  // Simple performance message
  const getMessage = () => {
    if (percentage >= 90) return { text: "Excellent! 🎉", color: "text-green-600" };
    if (percentage >= 70) return { text: "Good Job! 👍", color: "text-blue-600" };
    if (percentage >= 50) return { text: "Not Bad! 👌", color: "text-yellow-600" };
    return { text: "Keep Practicing! 💪", color: "text-orange-600" };
  };

  const message = getMessage();

  // Handle saving high score
  const handleSaveScore = (playerName) => {
    const scoreData = {
      playerName,
      score,
      totalQuestions,
      percentage
    };
    
    saveScore(scoreData);
    setShowNameInput(false);
    setScoreSubmitted(true);
  };

  const handleSkipSave = () => {
    setShowNameInput(false);
    setScoreSubmitted(true);
  };

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
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          onClick={onRestart}
        >
          Play Again
        </button>
        <button 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          onClick={() => setShowLeaderboard(true)}
        >
          🏆 Leaderboard
        </button>
      </div>

      {/* High Score Badge */}
      {scoreSubmitted && isHighScore(percentage) && (
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-lg text-center">
          <span className="text-yellow-700 font-semibold">🎉 New High Score! 🎉</span>
        </div>
      )}

      {/* Modals */}
      {showNameInput && (
        <NameInputModal
          score={score}
          totalQuestions={totalQuestions}
          percentage={percentage}
          onSave={handleSaveScore}
          onSkip={handleSkipSave}
        />
      )}

      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}
    </div>
  );
};

export default GameResults;