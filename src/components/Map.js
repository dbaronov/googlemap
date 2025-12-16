import React, { useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useMap } from '../context/MapContext';
import { LOCATIONS } from '../data/locations';
import BoundaryLayer from './BoundaryLayer';
import MarkerLayer from './MarkerLayer';
import LocationModal from './LocationModal';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCJcQHAjA6-T_u8VrhAxxdeRZ-3c037qIU';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const mapCenter = {
  lat: 53.963194,
  lng: -1.220817
};

const Map = () => {
  const { mapRef, setMapRef, boundaryPaths } = useMap();

  // Calculate bounds including boundary
  useEffect(() => {
    if (mapRef && boundaryPaths.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      // Include all boundary paths in bounds
      boundaryPaths.forEach(path => {
        path.forEach(point => {
          bounds.extend({ lat: point.lat, lng: point.lng });
        });
      });

      // Include all locations in bounds
      LOCATIONS.forEach(location => {
        bounds.extend({ lat: location.lat, lng: location.lng });
      });

      if (!bounds.isEmpty()) {
        mapRef.fitBounds(bounds, 50);
      }
    }
  }, [mapRef, boundaryPaths]);

  const handleMapLoad = useCallback(map => {
    setMapRef(map);
  }, [setMapRef]);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={8}
        onLoad={handleMapLoad}
        options={{
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: window.google?.maps?.ControlPosition?.RIGHT_CENTER
          },
          zoomControl: true,
          zoomControlOptions: {
            position: window.google?.maps?.ControlPosition?.RIGHT_CENTER
          },
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: window.google?.maps?.ControlPosition?.TOP_RIGHT
          },
          streetViewControl: true,
          streetViewControlOptions: {
            position: window.google?.maps?.ControlPosition?.RIGHT_CENTER
          }
        }}
        aria-label="Google Map showing Yorkshire and The Humber region with major cities and surrounding towns"
      >
        <BoundaryLayer />
        <MarkerLayer />
        <LocationModal />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
