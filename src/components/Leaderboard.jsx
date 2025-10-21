import { useState, useEffect } from 'react';
import { getLeaderboard, clearLeaderboard } from '../utils/leaderboard';

const Leaderboard = ({ onClose }) => {
  const [scores, setScores] = useState([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = () => {
    const leaderboardScores = getLeaderboard();
    setScores(leaderboardScores);
  };

  const handleClearScores = () => {
    if (clearLeaderboard()) {
      setScores([]);
      setShowConfirmClear(false);
    }
  };

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">🏆 Leaderboard</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {scores.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-gray-600 text-lg">No scores yet!</p>
              <p className="text-gray-500">Be the first to complete the quiz.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {scores.map((score, index) => (
                <div 
                  key={score.id}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                    index < 3 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {/* Rank */}
                  <div className="text-2xl mr-4">
                    {getRankEmoji(index + 1)}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-800">
                        {score.playerName}
                      </span>
                      <span className={`font-bold text-lg ${
                        score.percentage >= 90 ? 'text-green-600' :
                        score.percentage >= 70 ? 'text-blue-600' :
                        score.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {score.percentage}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{score.score}/{score.totalQuestions} correct</span>
                      <span>{score.date} at {score.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6 pt-6 border-t">
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
            
            {scores.length > 0 && (
              <button
                onClick={() => setShowConfirmClear(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Confirm Clear Dialog */}
          {showConfirmClear && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Clear Leaderboard?</h3>
                <p className="text-gray-600 mb-6">This will permanently delete all scores. This action cannot be undone.</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConfirmClear(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClearScores}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;