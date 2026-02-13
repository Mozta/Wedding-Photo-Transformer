import { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  { text: '💍 Eligiendo los anillos...', sub: 'Los más brillantes, por supuesto' },
  { text: '👰 Preparando el vestido...', sub: 'Algo prestado, algo azul...' },
  { text: '🤵 Ajustando el traje...', sub: 'Un nudo Windsor perfecto' },
  { text: '💐 Armando el bouquet...', sub: 'Rosas y peonías frescas' },
  { text: '⛪ Reservando la iglesia...', sub: 'Con vista al mar, ¿por qué no?' },
  { text: '📸 Contratando al fotógrafo...', sub: 'Solo el mejor del mundo' },
  { text: '🎂 Horneando el pastel...', sub: '7 pisos, mínimo' },
  { text: '🕊️ Entrenando las palomas...', sub: 'Para el momento perfecto' },
  { text: '🎵 Afinando la orquesta...', sub: 'La marcha nupcial...' },
  { text: '✨ Últimos retoques...', sub: '¡Ya casi está listo!' },
];

function LoadingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentMessage = LOADING_MESSAGES[messageIndex];

  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="loading-ring" />
        <span className="loading-heart">💒</span>
      </div>
      <p className="loading-text" key={messageIndex}>
        {currentMessage.text}
      </p>
      <p className="loading-subtext" key={`sub-${messageIndex}`}>
        {currentMessage.sub}
      </p>
    </div>
  );
}

export default LoadingOverlay;
