import React from 'react';
import { MapProvider } from './context/MapContext';
import Map from './components/Map';

const GoogleMapsComponent = () => {
  return (
    <MapProvider>
      <Map />
    </MapProvider>
  );
};

export default GoogleMapsComponent;
