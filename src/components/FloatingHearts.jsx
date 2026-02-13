import { useMemo } from 'react';

function FloatingHearts() {
  const hearts = useMemo(() => {
    const heartEmojis = ['💕', '💗', '💖', '💘', '❤️', '🩷', '💒', '🌹', '✨'];
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: heartEmojis[i % heartEmojis.length],
      left: `${Math.random() * 100}%`,
      animationDuration: `${15 + Math.random() * 20}s`,
      animationDelay: `${Math.random() * 15}s`,
      fontSize: `${0.8 + Math.random() * 1.2}rem`,
    }));
  }, []);

  return (
    <div className="hearts-bg">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
            fontSize: heart.fontSize,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}

export default FloatingHearts;
