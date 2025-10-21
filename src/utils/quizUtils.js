// Utility functions for quiz data management

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Validates question format
 * @param {Object} question - Question object to validate
 * @returns {Boolean} - True if valid, false otherwise
 */
export const validateQuestion = (question) => {
  if (!question || typeof question !== 'object') return false;
  
  const requiredFields = ['id', 'text', 'options', 'correctAnswer'];
  const hasRequiredFields = requiredFields.every(field => 
    question.hasOwnProperty(field) && question[field] !== null && question[field] !== undefined
  );
  
  if (!hasRequiredFields) return false;
  
  // Validate options array
  if (!Array.isArray(question.options) || question.options.length < 2) return false;
  
  // Validate correct answer index
  if (typeof question.correctAnswer !== 'number' || 
      question.correctAnswer < 0 || 
      question.correctAnswer >= question.options.length) return false;
  
  // Validate text fields are not empty
  if (typeof question.text !== 'string' || question.text.trim() === '') return false;
  if (question.options.some(option => typeof option !== 'string' || option.trim() === '')) return false;
  
  return true;
};

/**
 * Filters questions by category and difficulty
 * @param {Array} questions - Array of questions
 * @param {String} category - Category to filter by (optional)
 * @param {String} difficulty - Difficulty to filter by (optional)
 * @returns {Array} - Filtered questions
 */
export const filterQuestions = (questions, category = null, difficulty = null) => {
  return questions.filter(question => {
    const categoryMatch = !category || question.category === category;
    const difficultyMatch = !difficulty || question.difficulty === difficulty;
    return categoryMatch && difficultyMatch;
  });
};

/**
 * Gets a random subset of questions
 * @param {Array} questions - Array of questions
 * @param {Number} count - Number of questions to return
 * @returns {Array} - Random subset of questions
 */
export const getRandomQuestions = (questions, count) => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Calculates quiz statistics
 * @param {Number} score - Player's score
 * @param {Number} totalQuestions - Total number of questions
 * @returns {Object} - Statistics object
 */
export const calculateQuizStats = (score, totalQuestions) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let grade = 'F';
  let performance = 'Needs Improvement';
  let emoji = '😞';
  
  if (percentage >= 90) {
    grade = 'A+';
    performance = 'Excellent';
    emoji = '🎉';
  } else if (percentage >= 80) {
    grade = 'A';
    performance = 'Very Good';
    emoji = '😊';
  } else if (percentage >= 70) {
    grade = 'B';
    performance = 'Good';
    emoji = '👍';
  } else if (percentage >= 60) {
    grade = 'C';
    performance = 'Fair';
    emoji = '👌';
  } else if (percentage >= 50) {
    grade = 'D';
    performance = 'Below Average';
    emoji = '😐';
  }
  
  return {
    score,
    totalQuestions,
    percentage,
    grade,
    performance,
    emoji
  };
};

/**
 * Formats time in MM:SS format
 * @param {Number} seconds - Time in seconds
 * @returns {String} - Formatted time string
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};