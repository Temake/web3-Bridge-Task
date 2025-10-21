const Question = ({ question, onAnswer }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
        {question.text}
      </h2>
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="w-full p-4 text-left border-2 border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-400 rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onClick={() => onAnswer(index)}
          >
            <span className="text-lg text-gray-700">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;