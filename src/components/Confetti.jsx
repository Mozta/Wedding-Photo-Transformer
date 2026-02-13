import { useMemo } from 'react';

const COLORS = ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24', '#fcd34d', '#ffffff', '#e11d48'];

function Confetti() {
  const pieces = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      animationDuration: `${2 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 1}s`,
      size: `${6 + Math.random() * 8}px`,
      rotation: `${Math.random() * 360}deg`,
      shape: Math.random() > 0.5 ? '50%' : '2px',
    }));
  }, []);

  return (
    <div className="confetti-container">
      {pieces.map(piece => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.shape,
            animationDuration: piece.animationDuration,
            animationDelay: piece.animationDelay,
            transform: `rotate(${piece.rotation})`,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
