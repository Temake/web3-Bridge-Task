// API service for quiz data management

/**
 * Quiz Data Service - Handles loading from various sources
 */
export class QuizDataService {
  constructor(options = {}) {
    this.baseURL = options.baseURL || '';
    this.timeout = options.timeout || 10000;
    this.retryAttempts = options.retryAttempts || 3;
  }

  /**
   * Loads quiz data from local JSON file
   * @param {String} filePath - Path to JSON file
   * @returns {Promise} - Quiz data
   */
  async loadFromFile(filePath) {
    try {
      const response = await this.fetchWithTimeout(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to load from file: ${error.message}`);
    }
  }

  /**
   * Loads quiz data from API endpoint
   * @param {String} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} - Quiz data
   */
  async loadFromAPI(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await this.fetchWithTimeout(url, config);
      if (!response.ok) {
        throw new Error(`API error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to load from API: ${error.message}`);
    }
  }

  /**
   * Loads quiz data with retry mechanism
   * @param {Function} loadFunction - Function to execute
   * @returns {Promise} - Quiz data
   */
  async loadWithRetry(loadFunction) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await loadFunction();
      } catch (error) {
        lastError = error;
        console.warn(`Attempt ${attempt} failed:`, error.message);
        
        if (attempt < this.retryAttempts) {
          // Exponential backoff
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          await this.sleep(delay);
        }
      }
    }
    
    throw lastError;
  }

  /**
   * Fetch with timeout support
   * @param {String} url - URL to fetch
   * @param {Object} options - Fetch options
   * @returns {Promise} - Fetch response
   */
  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  /**
   * Sleep utility for delays
   * @param {Number} ms - Milliseconds to sleep
   * @returns {Promise} - Promise that resolves after delay
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Default quiz data service instance
 */
export const quizDataService = new QuizDataService();

/**
 * Predefined data sources
 */
export const DATA_SOURCES = {
  LOCAL: {
    GENERAL: '/src/data/questions.json',
    SCIENCE: '/src/data/science-questions.json',
    HISTORY: '/src/data/history-questions.json'
  },
  API: {
    TRIVIA_DB: 'https://opentdb.com/api.php',
    QUIZ_API: 'https://quizapi.io/api/v1/questions',
    CUSTOM: import.meta.env.VITE_QUIZ_API_URL || ''
  }
};

/**
 * Transforms Open Trivia DB format to our format
 * @param {Object} triviaData - Data from Open Trivia DB
 * @returns {Object} - Transformed data
 */
export const transformTriviaDB = (triviaData) => {
  if (!triviaData.results) {
    throw new Error('Invalid Trivia DB response');
  }

  const questions = triviaData.results.map((item, index) => {
    // Decode HTML entities
    const decodeHTML = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };

    const options = [...item.incorrect_answers, item.correct_answer]
      .map(decodeHTML)
      .sort(() => Math.random() - 0.5); // Shuffle options

    return {
      id: index + 1,
      text: decodeHTML(item.question),
      options: options,
      correctAnswer: options.indexOf(decodeHTML(item.correct_answer)),
      difficulty: item.difficulty,
      category: item.category.toLowerCase().replace(/ /g, '_')
    };
  });

  return {
    questions,
    metadata: {
      source: 'Open Trivia Database',
      totalQuestions: questions.length,
      responseCode: triviaData.response_code
    }
  };
};

/**
 * Error types for quiz data loading
 */
export const QUIZ_DATA_ERRORS = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  PARSE_ERROR: 'PARSE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  TIMEOUT: 'TIMEOUT',
  UNKNOWN: 'UNKNOWN'
};

/**
 * Gets error type from error object
 * @param {Error} error - Error object
 * @returns {String} - Error type
 */
export const getErrorType = (error) => {
  const message = error.message.toLowerCase();
  
  if (message.includes('timeout')) return QUIZ_DATA_ERRORS.TIMEOUT;
  if (message.includes('network') || message.includes('fetch')) return QUIZ_DATA_ERRORS.NETWORK_ERROR;
  if (message.includes('404') || message.includes('not found')) return QUIZ_DATA_ERRORS.NOT_FOUND;
  if (message.includes('parse') || message.includes('json')) return QUIZ_DATA_ERRORS.PARSE_ERROR;
  if (message.includes('validation') || message.includes('invalid')) return QUIZ_DATA_ERRORS.VALIDATION_ERROR;
  
  return QUIZ_DATA_ERRORS.UNKNOWN;
};