import React, { useRef, useEffect } from 'react';
import { useMap } from '../context/MapContext';
import '../GoogleMapsComponent.css';

const LocationModal = () => {
  const { selectedCity, closeInfo } = useMap();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Handle ESC key press to close modal and manage focus
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeInfo();
      }
    };

    if (selectedCity) {
      window.addEventListener('keydown', handleKeyDown);
      // Focus the close button when modal opens for better accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 100);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedCity, closeInfo]);

  if (!selectedCity) return null;

  return (
    <div className="modal-overlay" onClick={closeInfo} role="presentation" aria-hidden="false">
      <div 
        ref={modalRef}
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="city-name">{selectedCity.name}</h2>
          <button 
            ref={closeButtonRef}
            className="modal-close-button"
            onClick={closeInfo}
            aria-label={`Close ${selectedCity.name} information (Press Escape to close)`}
            title="Close (Escape key)"
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body" id="modal-description">
          <p className="city-description">{selectedCity.description}</p>
          <section className="city-info" aria-label="Location details">
            <h3 className="info-heading">Details</h3>
            {selectedCity.population && (
              <p><strong>Population:</strong> <span>{selectedCity.population}</span></p>
            )}
            <p><strong>Type:</strong> <span>{selectedCity.type}</span></p>
            <p><strong>Coordinates:</strong> <span>{selectedCity.lat.toFixed(4)}°N, {Math.abs(selectedCity.lng).toFixed(4)}°W</span></p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
