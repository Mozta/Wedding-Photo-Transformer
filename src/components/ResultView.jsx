function ResultView({ originalImage, resultImage, onDownload, onRetake }) {
  return (
    <div className="result-container">
      <h2 className="result-title">¡Felicidades, recién casados! 💍</h2>

      <div className="result-comparison">
        <div className="result-comparison__item">
          <img src={originalImage} alt="Foto original" />
          <span className="result-comparison__label">Antes 📸</span>
        </div>
        <div className="result-comparison__item">
          <img src={resultImage} alt="Foto de boda" />
          <span className="result-comparison__label">¡Casados! 💒</span>
        </div>
      </div>

      <div className="btn-group">
        <button className="btn btn-gold btn-large" onClick={onDownload}>
          💾 Descargar
        </button>
        <button className="btn btn-secondary" onClick={onRetake}>
          📸 Otra foto
        </button>
      </div>
    </div>
  );
}

export default ResultView;
