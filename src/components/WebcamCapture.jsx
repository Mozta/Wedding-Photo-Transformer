import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 720,
  height: 540,
  facingMode: 'user',
};

function WebcamCapture({ onCapture }) {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [showFlash, setShowFlash] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const startCountdown = useCallback(() => {
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        capturePhoto();
      }
    }, 1000);
  }, []);

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      // Flash effect
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 500);

      const imageSrc = webcamRef.current.getScreenshot({
        width: 1024,
        height: 1024,
      });
      
      if (imageSrc) {
        // Small delay for the flash to show
        setTimeout(() => {
          onCapture(imageSrc);
        }, 300);
      }
    }
  }, [onCapture]);

  return (
    <div className="webcam-container">
      <div className="webcam-wrapper">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.92}
          videoConstraints={videoConstraints}
          onUserMedia={() => setIsReady(true)}
          onUserMediaError={() => setIsReady(false)}
          mirrored={true}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'none', /* mirrored prop handles this */
          }}
        />
        <div className="webcam-frame" />

        {countdown !== null && (
          <div className="countdown-overlay">
            <span className="countdown-number">{countdown}</span>
          </div>
        )}

        {showFlash && <div className="flash-overlay" />}

        {!isReady && (
          <div className="countdown-overlay">
            <div className="webcam-permission">
              <span className="webcam-permission__icon">📷</span>
              <p className="webcam-permission__text">Permitir acceso a la cámara</p>
              <p className="webcam-permission__subtext">Necesitamos tu cámara para la foto</p>
            </div>
          </div>
        )}
      </div>

      <button
        className="btn btn-capture"
        onClick={startCountdown}
        disabled={!isReady || countdown !== null}
        title="Tomar foto"
      >
        📸
      </button>
    </div>
  );
}

export default WebcamCapture;
