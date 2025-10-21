// Animation utilities and custom CSS for the quiz game

export const fadeInUp = "animate-[fadeInUp_0.5s_ease-out]";
export const slideIn = "animate-[slideIn_0.3s_ease-out]";
export const bounce = "animate-[bounce_1s_ease-in-out_infinite]";
export const pulse = "animate-pulse";
export const spin = "animate-spin";

// Add these keyframes to your CSS or use Tailwind config
export const customAnimations = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes correctAnswer {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .correct-answer {
    animation: correctAnswer 0.6s ease-out;
  }

  @keyframes wrongAnswer {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
    100% { transform: translateX(0); }
  }

  .wrong-answer {
    animation: wrongAnswer 0.5s ease-out;
  }
`;

// Utility function to add animation classes
export const addAnimation = (element, animationClass, duration = 1000) => {
  if (!element) return;
  
  element.classList.add(animationClass);
  
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, duration);
};