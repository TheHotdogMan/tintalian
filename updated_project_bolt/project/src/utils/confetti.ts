const confetti = () => {
  const colors = ['#E63946', '#F1FAEE', '#4CAF50'];
  
  // Create confetti pieces
  for (let i = 0; i < 100; i++) {
    createConfettiPiece(colors);
  }
};

const createConfettiPiece = (colors: string[]) => {
  const confetti = document.createElement('div');
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  // Styling for the confetti piece
  confetti.style.backgroundColor = color;
  confetti.style.position = 'fixed';
  confetti.style.zIndex = '100';
  confetti.style.width = `${Math.random() * 10 + 5}px`;
  confetti.style.height = `${Math.random() * 5 + 5}px`;
  confetti.style.top = '0';
  confetti.style.left = `${Math.random() * 100}vw`;
  confetti.style.opacity = '1';
  confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
  
  // Add to body
  document.body.appendChild(confetti);
  
  // Animation
  const animation = confetti.animate(
    [
      {
        transform: `translate(0, 0) rotate(0deg)`,
        opacity: 1
      },
      {
        transform: `translate(${(Math.random() - 0.5) * 200}px, ${Math.random() * 100 + 50}vh) rotate(${Math.random() * 360}deg)`,
        opacity: 0
      }
    ],
    {
      duration: Math.random() * 3000 + 2000,
      easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
    }
  );
  
  // Remove element once animation is done
  animation.onfinish = () => {
    confetti.remove();
  };
};

export default confetti;