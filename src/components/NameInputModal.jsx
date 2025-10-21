import { useState } from 'react';

const NameInputModal = ({ score, totalQuestions, percentage, onSave, onSkip }) => {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const finalName = playerName.trim() || 'Anonymous';
    await onSave(finalName);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-xl text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold">High Score!</h2>
          <p className="text-green-100">You made it to the leaderboard!</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Score Display */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-xl font-semibold text-gray-700">
              {percentage}%
            </div>
          </div>

          {/* Name Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your name for the leaderboard:
              </label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Your name (or leave empty for Anonymous)"
                maxLength={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum 20 characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onSkip}
                disabled={isSubmitting}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                Skip
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </div>
                ) : (
                  'Save Score'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NameInputModal;