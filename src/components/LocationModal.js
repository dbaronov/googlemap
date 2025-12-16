import React, { useRef, useEffect } from 'react';
import { useMap } from '../context/MapContext';
import '../GoogleMapsComponent.css';

// Severity levels for different incident types
const INCIDENT_SEVERITY = {
  sewage: { level: 'critical', color: '#DC2626', label: 'Critical' },
  flooding: { level: 'critical', color: '#DC2626', label: 'Critical' },
  pollution: { level: 'high', color: '#EA580C', label: 'High' },
  leak: { level: 'high', color: '#EA580C', label: 'High' },
  pressure: { level: 'medium', color: '#F59E0B', label: 'Medium' },
  smell: { level: 'medium', color: '#F59E0B', label: 'Medium' },
  drain: { level: 'low', color: '#6B7280', label: 'Low' },
  other: { level: 'low', color: '#6B7280', label: 'Low' }
};

const formatIncidentType = (incident) => {
  return incident.charAt(0).toUpperCase() + incident.slice(1);
};

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

  const severity = INCIDENT_SEVERITY[selectedCity.incident] || INCIDENT_SEVERITY.other;

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
          
          {selectedCity.incident && (
            <div className="incident-alert" style={{ borderLeftColor: severity.color }}>
              <div className="incident-header">
                <span 
                  className="severity-badge"
                  style={{ backgroundColor: severity.color }}
                >
                  {severity.label}
                </span>
                <span className="incident-type">{formatIncidentType(selectedCity.incident)} Incident</span>
              </div>
            </div>
          )}

          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-icon">📍</div>
              <div className="detail-content">
                <div className="detail-label">Location Type</div>
                <div className="detail-value">{selectedCity.type.charAt(0).toUpperCase() + selectedCity.type.slice(1)}</div>
              </div>
            </div>

            {selectedCity.population && (
              <div className="detail-item">
                <div className="detail-icon">👥</div>
                <div className="detail-content">
                  <div className="detail-label">Population</div>
                  <div className="detail-value">{selectedCity.population}</div>
                </div>
              </div>
            )}

            <div className="detail-item">
              <div className="detail-icon">🌍</div>
              <div className="detail-content">
                <div className="detail-label">Coordinates</div>
                <div className="detail-value">{selectedCity.lat.toFixed(4)}°N, {Math.abs(selectedCity.lng).toFixed(4)}°W</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
