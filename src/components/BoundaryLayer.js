import React, { useEffect } from 'react';
import { Polyline } from '@react-google-maps/api';
import { useMap } from '../context/MapContext';

const BOUNDARY_OPTIONS = {
  strokeColor: '#837fd3ff',
  strokeOpacity: 1,
  strokeWeight: 2,
  fillColor: 'transparent',
  icons: [
    {
      icon: { path: 'M 0,-1 0,1', strokeWeight: 2, scale: 4 },
      offset: '0',
      repeat: '20px'
    }
  ]
};

const BoundaryLayer = () => {
  const { boundaryPaths, setBoundaryPaths } = useMap();

  // Fetch boundary from GeoJSON source
  useEffect(() => {
    const fetchBoundary = async () => {
      try {
        const response = await fetch('https://www.staging.planning.data.gov.uk/entity/30100002.geojson');
        const data = await response.json();
        const paths = [];

        // Handle MultiPolygon geometry
        if (data.geometry.type === 'MultiPolygon') {
          data.geometry.coordinates.forEach(polygon => {
            // Each polygon is an array of rings, outer ring first
            polygon.forEach(ring => {
              const pathPoints = ring.map(coord => ({
                lat: coord[1],
                lng: coord[0]
              }));
              paths.push(pathPoints);
            });
          });
        }

        setBoundaryPaths(paths);
      } catch (error) {
        console.error('Error fetching boundary data:', error);
      }
    };

    fetchBoundary();
  }, [setBoundaryPaths]);

  return (
    <>
      {boundaryPaths.map((path, index) => (
        <Polyline
          key={`boundary-${index}`}
          path={path}
          options={BOUNDARY_OPTIONS}
          aria-label={`Yorkshire and The Humber region boundary segment ${index + 1}`}
        />
      ))}
    </>
  );
};

export default BoundaryLayer;
