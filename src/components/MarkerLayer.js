import { useEffect, useRef, useCallback } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useMap } from '../context/MapContext';
import { LOCATIONS } from '../data/locations';

const MarkerLayer = () => {
  const { mapRef, setSelectedCity } = useMap();
  const markersRef = useRef([]);
  const clusterRef = useRef(null);

  const handleMarkerClick = useCallback((location, marker) => {
    setSelectedCity(location);
  }, [setSelectedCity]);

  useEffect(() => {
    if (!mapRef) return;

    // Create marker objects for all locations
    const markers = LOCATIONS.map(location => 
      new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        title: location.name
      })
    );

    markersRef.current = markers;

    // Initialize marker clusterer
    if (!clusterRef.current && markers.length > 0) {
      clusterRef.current = new MarkerClusterer({
        map: mapRef,
        markers,
        algorithmOptions: {
          radius: 120
        },
        renderer: {
          render: ({ count, position }) => {
            const color = count > 50 ? '#ff4444' : count > 20 ? '#ff9944' : '#2d62abff';
            return new window.google.maps.Marker({
              label: {
                text: String(count),
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              },
              position,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 18,
                fillColor: color,
                fillOpacity: 0.8,
                strokeColor: 'white',
                strokeWeight: 2
              },
              title: `${count} locations`
            });
          }
        }
      });

      // Add click listeners to markers
      markers.forEach((marker, index) => {
        const location = LOCATIONS[index];
        marker.addListener('click', () => handleMarkerClick(location, marker));
      });
    }

    // Cleanup
    return () => {
      if (clusterRef.current) {
        clusterRef.current.clearMarkers();
        clusterRef.current = null;
      }
      markersRef.current.forEach(marker => {
        window.google.maps.event.clearInstanceListeners(marker);
      });
      markersRef.current = [];
    };
  }, [mapRef, handleMarkerClick]);

  return null;
};

export default MarkerLayer;
