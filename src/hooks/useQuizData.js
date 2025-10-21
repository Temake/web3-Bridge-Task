import { useState, useEffect, useCallback } from 'react';
import { validateQuestion } from '../utils/quizUtils';

/**
 * Custom hook for loading quiz data
 * @param {String} source - Data source (file path or API endpoint)
 * @param {Object} options - Loading options
 * @returns {Object} - Loading state and data
 */
export const useQuizData = (source = '/src/data/questions.json', options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const {
    maxRetries = 3,
    retryDelay = 1000,
    validateData = true,
    category = null
  } = options;

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      let jsonData;

      // Check if source is a URL (API endpoint) or local file
      if (source.startsWith('http')) {
        // API call
        response = await fetch(source);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        jsonData = await response.json();
      } else {
        // Local file - using dynamic import for JSON
        try {
          const module = await import(source);
          jsonData = module.default || module;
        } catch {
          // Fallback to fetch for public folder files
          response = await fetch(source);
          if (!response.ok) {
            throw new Error(`Failed to load questions: ${response.status}`);
          }
          jsonData = await response.json();
        }
      }

      // Validate data structure
      if (!jsonData || typeof jsonData !== 'object') {
        throw new Error('Invalid data format: Expected JSON object');
      }

      let questions = [];

      // Handle different data structures
      if (jsonData.categories) {
        // Structured format with categories
        if (category && jsonData.categories[category]) {
          questions = jsonData.categories[category].questions || [];
        } else {
          // Flatten all questions from all categories
          questions = Object.values(jsonData.categories)
            .flatMap(cat => cat.questions || []);
        }
      } else if (Array.isArray(jsonData.questions)) {
        // Simple format with questions array
        questions = jsonData.questions;
      } else if (Array.isArray(jsonData)) {
        // Direct array format
        questions = jsonData;
      } else {
        throw new Error('Invalid data structure: No questions found');
      }

      // Validate questions if enabled
      if (validateData) {
        const validQuestions = questions.filter(q => {
          const isValid = validateQuestion(q);
          if (!isValid) {
            console.warn('Invalid question found:', q);
          }
          return isValid;
        });

        if (validQuestions.length === 0) {
          throw new Error('No valid questions found in the dataset');
        }

        questions = validQuestions;
      }

      // Ensure questions have unique IDs
      questions = questions.map((q, index) => ({
        ...q,
        id: q.id || index + 1
      }));

      setData({
        questions,
        metadata: jsonData.metadata || {},
        categories: jsonData.categories ? Object.keys(jsonData.categories) : [],
        totalQuestions: questions.length
      });

      setRetryCount(0);
    } catch (err) {
      console.error('Error loading quiz data:', err);
      setError(err);

      // Retry logic
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, retryDelay * (retryCount + 1)); // Exponential backoff
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [source, category, retryCount]); // loadData is stable within this effect

  const retry = () => {
    setRetryCount(0);
    loadData();
  };

  return {
    data,
    loading,
    error,
    retry,
    retryCount,
    isRetrying: retryCount > 0 && retryCount <= maxRetries
  };
};

/**
 * Custom hook for managing quiz game state
 * @param {Array} questions - Array of quiz questions
 * @param {Object} options - Game options
 * @returns {Object} - Game state and controls
 */
export const useQuizGame = (questions = [], options = {}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [gameState, setGameState] = useState('ready'); // ready, playing, finished
  const [timeLeft, setTimeLeft] = useState(null);
  const [gameStats, setGameStats] = useState(null);

  const {
    questionTimeLimit = null, // seconds per question
    shuffleQuestions = true,
    maxQuestions = null
  } = options;

  const [gameQuestions, setGameQuestions] = useState([]);

  // Initialize game questions
  useEffect(() => {
    if (questions.length > 0) {
      let gameQs = [...questions];
      
      if (shuffleQuestions) {
        // Shuffle questions
        for (let i = gameQs.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [gameQs[i], gameQs[j]] = [gameQs[j], gameQs[i]];
        }
      }
      
      if (maxQuestions) {
        gameQs = gameQs.slice(0, maxQuestions);
      }
      
      setGameQuestions(gameQs);
    }
  }, [questions, shuffleQuestions, maxQuestions]);

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && questionTimeLimit && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      // Time up - auto advance
      handleAnswer(-1); // -1 indicates timeout
    }
  }, [timeLeft, gameState, questionTimeLimit, handleAnswer]);

  const startGame = () => {
    if (gameQuestions.length === 0) return;
    
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setGameState('playing');
    setGameStats(null);
    
    if (questionTimeLimit) {
      setTimeLeft(questionTimeLimit);
    }
  };

  const handleAnswer = useCallback((selectedAnswer) => {
    const currentQuestion = gameQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const isTimeout = selectedAnswer === -1;
    
    // Record answer
    const answerRecord = {
      questionId: currentQuestion.id,
      selectedAnswer: isTimeout ? null : selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      isTimeout,
      timeSpent: questionTimeLimit ? (questionTimeLimit - (timeLeft || 0)) : null
    };
    
    setAnswers(prev => [...prev, answerRecord]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question or finish game
    if (currentQuestionIndex < gameQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      if (questionTimeLimit) {
        setTimeLeft(questionTimeLimit);
      }
    } else {
      // Game finished
      finishGame(score + (isCorrect ? 1 : 0));
    }
  }, [gameQuestions, currentQuestionIndex, questionTimeLimit, timeLeft, score]);

  const finishGame = useCallback((finalScore) => {
    setGameState('finished');
    
    // Calculate comprehensive stats
    const stats = {
      score: finalScore,
      totalQuestions: gameQuestions.length,
      percentage: Math.round((finalScore / gameQuestions.length) * 100),
      answers: answers,
      correctAnswers: finalScore,
      incorrectAnswers: gameQuestions.length - finalScore,
      timeouts: answers.filter(a => a.isTimeout).length
    };
    
    setGameStats(stats);
  }, [gameQuestions.length, answers]);

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setGameState('ready');
    setTimeLeft(null);
    setGameStats(null);
  };

  return {
    // Game state
    gameState,
    currentQuestion: gameQuestions[currentQuestionIndex] || null,
    currentQuestionIndex,
    totalQuestions: gameQuestions.length,
    score,
    answers,
    timeLeft,
    gameStats,
    
    // Game controls
    startGame,
    handleAnswer,
    resetGame,
    finishGame,
    
    // Computed values
    progress: gameQuestions.length > 0 ? (currentQuestionIndex / gameQuestions.length) * 100 : 0,
    hasQuestions: gameQuestions.length > 0
  };
};