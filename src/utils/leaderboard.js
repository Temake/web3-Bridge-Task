// Simple leaderboard utilities using localStorage

/**
 * Save score to leaderboard
 * @param {Object} scoreData - Score data to save
 */
export const saveScore = (scoreData) => {
  try {
    const scores = getLeaderboard();
    const newScore = {
      id: Date.now(),
      playerName: scoreData.playerName || 'Anonymous',
      score: scoreData.score,
      totalQuestions: scoreData.totalQuestions,
      percentage: scoreData.percentage,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };
    
    scores.push(newScore);
    
    // Sort by percentage (highest first), then by score
    scores.sort((a, b) => {
      if (b.percentage === a.percentage) {
        return b.score - a.score;
      }
      return b.percentage - a.percentage;
    });
    
    // Keep only top 10 scores
    const topScores = scores.slice(0, 10);
    localStorage.setItem('quizLeaderboard', JSON.stringify(topScores));
    
    return newScore;
  } catch (error) {
    console.error('Error saving score:', error);
    return null;
  }
};

/**
 * Get leaderboard from localStorage
 * @returns {Array} - Array of top scores
 */
export const getLeaderboard = () => {
  try {
    const scores = localStorage.getItem('quizLeaderboard');
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    return [];
  }
};

/**
 * Clear all scores from leaderboard
 */
export const clearLeaderboard = () => {
  try {
    localStorage.removeItem('quizLeaderboard');
    return true;
  } catch (error) {
    console.error('Error clearing leaderboard:', error);
    return false;
  }
};

/**
 * Check if score qualifies for leaderboard
 * @param {Number} percentage - Score percentage
 * @returns {Boolean} - True if score makes top 10
 */
export const isHighScore = (percentage) => {
  const leaderboard = getLeaderboard();
  if (leaderboard.length < 10) return true;
  
  const lowestScore = leaderboard[leaderboard.length - 1];
  return percentage > lowestScore.percentage;
};