import React, { createContext, useContext, useState, useCallback } from 'react';

const MapContext = createContext();

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};

export const MapProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [boundaryPaths, setBoundaryPaths] = useState([]);

  const handleSelectCity = useCallback((city) => {
    setSelectedCity(city);
    if (mapRef && city) {
      mapRef.panTo({ lat: city.lat, lng: city.lng });
    }
  }, [mapRef]);

  const handleCloseInfo = useCallback(() => {
    setSelectedCity(null);
  }, []);

  const value = {
    selectedCity,
    setSelectedCity: handleSelectCity,
    closeInfo: handleCloseInfo,
    mapRef,
    setMapRef,
    boundaryPaths,
    setBoundaryPaths
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
