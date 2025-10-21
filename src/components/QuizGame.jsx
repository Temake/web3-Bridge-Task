import { useState } from 'react';
import Question from './Question';
import GameResults from './GameResults';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import StartScreen from './StartScreen';

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

  // Simple function to load questions
  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Import questions from our JSON file
      const response = await fetch('/src/data/questions.json');
      const data = await response.json();
      
      // Get all questions from all categories and shuffle them
      const allQuestions = Object.values(data.categories)
        .flatMap(category => category.questions)
        .sort(() => Math.random() - 0.5)
        .slice(0, 10); // Take only 10 questions
      
      setQuestions(allQuestions);
      setLoading(false);
      setGameState('playing');
    } catch (err) {
      setError(err);
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
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dynamic Quiz Game
        </h1>
        
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
      </div>
    </ErrorBoundary>
  );
};

export default QuizGame;