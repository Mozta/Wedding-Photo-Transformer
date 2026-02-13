function PhotoPreview({ image, selectedStyle, onStyleChange, onRetake, onTransform, error }) {
  return (
    <div className="preview-container">
      <div className="preview-image-wrapper">
        <img src={image} alt="Foto capturada" />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="style-selector">
        <p className="style-selector__label">Elige el estilo de boda ✨</p>
        <div className="style-options">
          <label className={`style-option ${selectedStyle === 'romantic' ? 'active' : ''}`}>
            <input
              type="radio"
              name="style"
              value="romantic"
              checked={selectedStyle === 'romantic'}
              onChange={() => onStyleChange('romantic')}
            />
            <span className="style-option__emoji">💐</span>
            <span className="style-option__name">Romántico</span>
            <span className="style-option__desc">Elegante y soñador</span>
          </label>
          <label className={`style-option ${selectedStyle === 'funny' ? 'active' : ''}`}>
            <input
              type="radio"
              name="style"
              value="funny"
              checked={selectedStyle === 'funny'}
              onChange={() => onStyleChange('funny')}
            />
            <span className="style-option__emoji">🎉</span>
            <span className="style-option__name">Divertido</span>
            <span className="style-option__desc">¡Over the top!</span>
          </label>
        </div>
      </div>

      <div className="btn-group">
        <button className="btn btn-secondary" onClick={onRetake}>
          🔄 Retomar
        </button>
        <button className="btn btn-primary btn-large" onClick={onTransform}>
          💒 ¡Casarnos!
        </button>
      </div>
    </div>
  );
}

export default PhotoPreview;
