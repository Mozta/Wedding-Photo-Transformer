import { useState, useCallback } from 'react';
import Header from './components/Header';
import WebcamCapture from './components/WebcamCapture';
import PhotoPreview from './components/PhotoPreview';
import ResultView from './components/ResultView';
import LoadingOverlay from './components/LoadingOverlay';
import FloatingHearts from './components/FloatingHearts';
import Confetti from './components/Confetti';
import { transformImage } from './services/imageApi';
import './App.css';

function App() {
  // States: idle | preview | processing | result | error
  const [appState, setAppState] = useState('idle');
  const [capturedImage, setCapturedImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('romantic');
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCapture = useCallback((imageSrc) => {
    setCapturedImage(imageSrc);
    setAppState('preview');
    setError(null);
  }, []);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setResultImage(null);
    setAppState('idle');
    setError(null);
    setShowConfetti(false);
  }, []);

  const handleTransform = useCallback(async () => {
    setAppState('processing');
    setError(null);

    try {
      const result = await transformImage(capturedImage, selectedStyle);
      setResultImage(result);
      setAppState('result');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (err) {
      setError(err.message || 'Error al transformar la imagen. Intenta de nuevo.');
      setAppState('preview');
    }
  }, [capturedImage, selectedStyle]);

  const handleDownload = useCallback(() => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `boda-14feb-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [resultImage]);

  return (
    <>
      <FloatingHearts />
      {showConfetti && <Confetti />}
      
      <Header />

      <main className="app-container">
        {appState === 'idle' && (
          <div className="glass-card">
            <WebcamCapture onCapture={handleCapture} />
          </div>
        )}

        {appState === 'preview' && (
          <div className="glass-card">
            <PhotoPreview
              image={capturedImage}
              selectedStyle={selectedStyle}
              onStyleChange={setSelectedStyle}
              onRetake={handleRetake}
              onTransform={handleTransform}
              error={error}
            />
          </div>
        )}

        {appState === 'processing' && (
          <LoadingOverlay />
        )}

        {appState === 'result' && (
          <div className="glass-card">
            <ResultView
              originalImage={capturedImage}
              resultImage={resultImage}
              onDownload={handleDownload}
              onRetake={handleRetake}
            />
          </div>
        )}
      </main>

      <footer className="footer">
        💒 Hecho con amor para el 14 de febrero · Lab Edition
      </footer>
    </>
  );
}

export default App;
