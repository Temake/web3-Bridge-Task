import { useState } from 'react';
import Question from './Question';
import GameResults from './GameResults';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import StartScreen from './StartScreen';
import Leaderboard from './Leaderboard';

const QuizGame = () => {
  // Simple game state
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'finished'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Simple function to load questions with better error handling
  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Import questions from our JSON file
      const response = await fetch('/data/questions.json');
      
      if (!response.ok) {
        throw new Error(`Failed to load questions: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate data structure
      if (!data || !data.categories) {
        throw new Error('Invalid question data format');
      }
      
      // Get all questions from all categories and shuffle them
      const allQuestions = Object.values(data.categories)
        .flatMap(category => category.questions || [])
        .filter(q => q && q.text && q.options && q.options.length >= 2)
        .sort(() => Math.random() - 0.5)
        .slice(0, 10); // Take only 10 questions
      
      if (allQuestions.length === 0) {
        throw new Error('No valid questions found');
      }
      
      setQuestions(allQuestions);
      setLoading(false);
      setGameState('playing');
    } catch (err) {
      console.error('Error loading questions:', err);
      setError(new Error(`Unable to load quiz questions. Please try again. (${err.message})`));
      setLoading(false);
    }
  };

  // Start the game
  const startGame = () => {
    loadQuestions();
  };

  // Handle answer selection
  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    // Check if answer is correct
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question after 1.5 seconds
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setGameState('finished');
      }
    }, 1500);
  };

  // Restart the game
  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameState('start');
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuestions([]);
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ErrorBoundary error={error} onRetry={loadQuestions}>
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
        {/* Header with title and leaderboard button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center sm:text-left">
            Dynamic Quiz Game
          </h1>
          {gameState !== 'playing' && (
            <button
              onClick={() => setShowLeaderboard(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
            >
              🏆 Leaderboard
            </button>
          )}
        </div>
        
        {gameState === 'start' && (
          <StartScreen onStart={startGame} questionCount={10} />
        )}

        {gameState === 'finished' ? (
          <GameResults 
            score={score} 
            totalQuestions={questions.length} 
            onRestart={restartGame} 
          />
        ) : gameState === 'playing' && (
          <div>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Component */}
            {questions.length > 0 && (
              <Question 
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                showFeedback={showFeedback}
              />
            )}
          </div>
        )}

        {/* Leaderboard Modal */}
        {showLeaderboard && (
          <Leaderboard onClose={() => setShowLeaderboard(false)} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default QuizGame;