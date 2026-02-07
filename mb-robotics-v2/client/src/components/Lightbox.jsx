import { useState, useEffect, useCallback } from 'react';

export default function Lightbox({ images, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>
        <button className="lightbox-prev" onClick={goPrev} aria-label="Previous">
          <i className="fas fa-chevron-left"></i>
        </button>
        <img
          src={images[index].src}
          alt={images[index].alt || ''}
          className="lightbox-image"
        />
        <button className="lightbox-next" onClick={goNext} aria-label="Next">
          <i className="fas fa-chevron-right"></i>
        </button>
        {images[index].caption && (
          <p className="lightbox-caption">{images[index].caption}</p>
        )}
        <p className="lightbox-counter">{index + 1} / {images.length}</p>
      </div>
    </div>
  );
}
