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
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
        {question.text}
      </h2>
      
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getButtonStyle(index)}
            onClick={() => !showFeedback && onAnswer(index)}
            disabled={showFeedback}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg">{option}</span>
              {showFeedback && (
                <span className="text-2xl">
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
            <div className="text-green-600 font-semibold text-lg">
              🎉 Correct! Well done!
            </div>
          ) : (
            <div className="text-red-600 font-semibold text-lg">
              😞 Sorry, that's incorrect. The correct answer is: {question.options[question.correctAnswer]}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;