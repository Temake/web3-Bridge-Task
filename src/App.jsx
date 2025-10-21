import QuizGame from './components/QuizGame'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
            <span className="text-2xl">🧠</span>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Challenge yourself with our dynamic quiz game
          </p>
        </div>

        {/* Main Game */}
        <QuizGame />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 Dynamic Quiz Game. Test your knowledge!</p>
        </div>
      </div>
    </div>
  )
}

export default App
