# 🧠 Dynamic Quiz Game

A modern, interactive quiz game built with React and Tailwind CSS that challenges your knowledge across various topics including General Knowledge, Science & Technology, and World History.

![Quiz Game Demo](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.0+-06B6D4)

## 🎮 How to Play

### Getting Started
1. **Start the Game**: Click the "Start Quiz" button on the welcome screen
2. **Answer Questions**: You'll be presented with 10 random multiple-choice questions
3. **Get Instant Feedback**: After selecting an answer, you'll immediately see if it's correct or incorrect
4. **Track Progress**: Watch your score and progress bar as you advance through questions
5. **View Results**: See your final score, percentage, and performance rating
6. **Save High Scores**: Enter your name if you achieve a top 10 score!

### Game Rules

📝 **Question Format**
- 10 multiple-choice questions per game
- Questions are randomly selected from different categories
- Each question has 4 possible answers
- Only one correct answer per question

⏱️ **Timing**
- No time limit - take your time to think
- Automatic progression after answering (1.5 second delay)
- Focus on accuracy over speed

📊 **Scoring System**
- 1 point per correct answer
- Maximum possible score: 10/10 (100%)
- Performance ratings:
  - 🎉 **Excellent**: 90-100% (9-10 correct)
  - 👍 **Good Job**: 70-89% (7-8 correct)
  - 👌 **Not Bad**: 50-69% (5-6 correct)
  - 💪 **Keep Practicing**: Below 50% (0-4 correct)

🏆 **Leaderboard**
- Top 10 high scores are automatically saved
- Enter your name when you achieve a qualifying score
- Scores are ranked by percentage, then by total correct answers
- View leaderboard anytime by clicking the "🏆 Leaderboard" button

## 🎯 Game Features

### 🎲 **Dynamic Content**
- Questions span multiple categories:
  - **General Knowledge**: Geography, basic facts
  - **Science & Technology**: Physics, chemistry, biology, computing
  - **World History**: Ancient history, modern events, famous figures
- Random question selection ensures unique gameplay each time
- Difficulty levels: Easy, Medium, Hard

### 🎨 **Interactive Interface**
- **Visual Feedback**: Correct answers turn green ✅, incorrect ones turn red ❌
- **Progress Tracking**: Real-time progress bar and score display
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Engaging transitions and hover effects

### 🏅 **Achievement System**
- **High Score Detection**: Automatic notification for top 10 performances
- **Performance Analytics**: Detailed breakdown of correct vs incorrect answers
- **Persistent Storage**: Scores saved locally on your device
- **Leaderboard Management**: View all scores or clear the leaderboard

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm package manager

### Quick Start
```bash
# Clone the repository
git clone [your-repo-url]
cd gameProj

# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev

# Open your browser to http://localhost:5173
```

### Build for Production
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 🎪 Game Screenshots & Flow

### 1. Welcome Screen
- Game introduction and rules
- "Start Quiz" button to begin
- Access to leaderboard

### 2. Quiz Gameplay
- Question display with multiple choice options
- Progress bar showing completion status
- Current score tracking
- Immediate feedback after each answer

### 3. Results Screen
- Final score and percentage
- Performance message with emoji
- Breakdown of correct vs incorrect answers
- Options to play again or view leaderboard

### 4. Leaderboard
- Top 10 high scores with player names
- Ranking system with medals (🥇🥈🥉)
- Date and time of each score
- Option to clear all scores

## 🎮 Gameplay Tips

### 📚 **Improve Your Performance**
1. **Read Carefully**: Take time to read each question thoroughly
2. **Eliminate Options**: Rule out obviously incorrect answers first
3. **Use Logic**: Apply reasoning even if you're unsure
4. **Learn from Feedback**: Pay attention to correct answers when you're wrong
5. **Play Regularly**: Questions are randomized, so replay to see new content

### 🧠 **Knowledge Areas to Study**
- **Geography**: World capitals, countries, landmarks
- **Science**: Basic physics, chemistry, biology concepts
- **Technology**: Computer basics, programming, modern tech
- **History**: Major events, historical figures, ancient civilizations
- **General Knowledge**: Common facts, culture, sports

## 🔧 Technical Features

### 💾 **Data Management**
- Questions stored in JSON format for easy updates
- Local storage for persistent high scores
- Error handling for data loading issues
- Automatic data validation

### 📱 **Responsive Design**
- Mobile-first design approach
- Optimized for all screen sizes
- Touch-friendly interface
- Accessible navigation

### ⚡ **Performance**
- Fast loading with optimized assets
- Smooth animations and transitions
- Efficient state management
- Minimal bundle size

## 🛠️ Customization

### Adding New Questions
1. Edit `src/data/questions.json`
2. Follow the existing format:
```json
{
  "id": 16,
  "text": "Your question here?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 0,
  "difficulty": "medium",
  "category": "your_category"
}
```

### Modifying Game Settings
- Change number of questions per game in `QuizGame.jsx`
- Adjust feedback delay timing
- Modify scoring system in `GameResults.jsx`
- Update performance thresholds

## 🐛 Troubleshooting

### Common Issues

**Questions not loading?**
- Check if `questions.json` file exists in `src/data/`
- Ensure JSON format is valid
- Check browser console for errors

**Scores not saving?**
- Verify localStorage is enabled in browser
- Check for private/incognito mode restrictions
- Clear browser cache and try again

**Game not responsive?**
- Ensure Tailwind CSS is properly loaded
- Check for JavaScript errors in console
- Verify all component imports are correct

## 📞 Support

If you encounter any issues or have questions:
1. Check the console for error messages
2. Verify all dependencies are installed correctly
3. Ensure you're using a modern browser with JavaScript enabled
4. Try refreshing the page or clearing browser cache

## 🎊 Have Fun!

The Dynamic Quiz Game is designed to be both educational and entertaining. Challenge yourself, compete with friends by comparing scores, and learn something new with each play session!

**Good luck and enjoy testing your knowledge!** 🧠✨

---

## 🛠️ Development Stack

This project is built with:
- **React 18+** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

### Development Setup
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- Hot Module Replacement (HMR) for instant development feedback
- Optimized production builds with code splitting

*Built with ❤️ using React, Tailwind CSS, and modern web technologies*
