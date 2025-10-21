const Question = ({ question, onAnswer, selectedAnswer, showFeedback }) => {
  // Get button style based on answer state
  const getButtonStyle = (index) => {
    let baseStyle = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 focus:outline-none ";
    
    if (!showFeedback) {
      // Before answering - normal interactive style
      return baseStyle + "border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-400 transform hover:-translate-y-1 hover:shadow-md";
    }
    
    // After answering - show feedback
    if (index === question.correctAnswer) {
      // Correct answer - green
      return baseStyle + "border-green-500 bg-green-100 text-green-800";
    } else if (index === selectedAnswer) {
      // Wrong selected answer - red
      return baseStyle + "border-red-500 bg-red-100 text-red-800";
    } else {
      // Other options - disabled gray
      return baseStyle + "border-gray-200 bg-gray-50 text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed text-center sm:text-left">
        {question.text}
      </h2>
      
      <div className="grid gap-3 sm:gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getButtonStyle(index)}
            onClick={() => !showFeedback && onAnswer(index)}
            disabled={showFeedback}
          >
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg flex-1 pr-2">{option}</span>
              {showFeedback && (
                <span className="text-xl sm:text-2xl flex-shrink-0">
                  {index === question.correctAnswer ? '✅' : 
                   index === selectedAnswer ? '❌' : ''}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Feedback message */}
      {showFeedback && (
        <div className="mt-6 p-4 rounded-lg text-center">
          {selectedAnswer === question.correctAnswer ? (
            <div className="text-green-600 font-semibold text-base sm:text-lg">
              🎉 Correct! Well done!
            </div>
          ) : (
            <div className="text-red-600 font-semibold text-sm sm:text-base">
              😞 Sorry, that's incorrect. <br className="sm:hidden" />
              <span className="block sm:inline mt-1 sm:mt-0">
                The correct answer is: <strong>{question.options[question.correctAnswer]}</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;