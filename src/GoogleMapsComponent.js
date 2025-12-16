import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import './GoogleMapsComponent.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCJcQHAjA6-T_u8VrhAxxdeRZ-3c037qIU';

// All locations in Yorkshire and The Humber (cities, towns, villages)
const LOCATIONS = [
  // Major cities
  {
    id: 1,
    name: 'Leeds',
    lat: 53.8008,
    lng: -1.5491,
    description: 'Major city and economic centre of Yorkshire, known for banking, law and business services.',
    population: '793,000',
    type: 'city'
  },
  {
    id: 2,
    name: 'Sheffield',
    lat: 53.3811,
    lng: -1.4701,
    description: 'Historic industrial city in South Yorkshire, famous for steel manufacturing.',
    population: '584,000',
    type: 'city'
  },
  {
    id: 3,
    name: 'Bradford',
    lat: 53.7954,
    lng: -1.7565,
    description: 'Major city in West Yorkshire, once the world centre of worsted textile manufacture.',
    population: '349,000',
    type: 'city'
  },
  {
    id: 4,
    name: 'Hull',
    lat: 53.7441,
    lng: -0.3373,
    description: 'Historic port city in the East Riding of Yorkshire, major transport hub.',
    population: '259,000',
    type: 'city'
  },
  {
    id: 5,
    name: 'York',
    lat: 53.9581,
    lng: -1.0873,
    description: 'Historic city surrounded by medieval city walls, major heritage attraction.',
    population: '210,000',
    type: 'city'
  },
  {
    id: 6,
    name: 'Doncaster',
    lat: 53.5229,
    lng: -1.1318,
    description: 'Historic market town known for its railway heritage and locomotives.',
    population: '302,000',
    type: 'city'
  },
  {
    id: 7,
    name: 'Wakefield',
    lat: 53.6832,
    lng: -1.4987,
    description: 'Cathedral city and historic county town of West Yorkshire.',
    population: '343,000',
    type: 'city'
  },
  {
    id: 8,
    name: 'Harrogate',
    lat: 53.9954,
    lng: -1.5396,
    description: 'Historic spa town and major tourist destination in North Yorkshire.',
    population: '80,000',
    type: 'city'
  },
  
  // Towns and villages
  // West Yorkshire towns
  { id: 9, name: 'Huddersfield', lat: 53.6456, lng: -1.7862, type: 'town', description: 'Historic textile town', population: '146,000' },
  { id: 10, name: 'Castleford', lat: 53.7211, lng: -1.2902, type: 'town', description: 'Historic market town', population: '38,000' },
  { id: 11, name: 'Pontefract', lat: 53.6907, lng: -1.3155, type: 'town', description: 'Medieval castle town', population: '30,000' },
  { id: 12, name: 'Batley', lat: 53.7174, lng: -1.6391, type: 'town', description: 'Historic textile town', population: '49,000' },
  { id: 13, name: 'Dewsbury', lat: 53.7029, lng: -1.6286, type: 'town', description: 'Historic town', population: '51,000' },
  { id: 14, name: 'Keighley', lat: 53.8656, lng: -1.9495, type: 'town', description: 'Market town', population: '56,000' },
  { id: 15, name: 'Bingley', lat: 53.8303, lng: -1.9288, type: 'town', description: 'Historic mill town', population: '9,000' },
  { id: 16, name: 'Shipley', lat: 53.8218, lng: -1.8896, type: 'village', description: 'Historic village', population: '24,000' },
  { id: 17, name: 'Saltaire', lat: 53.8332, lng: -1.8627, type: 'village', description: 'Victorian model village', population: '3,000' },
  { id: 18, name: 'Otley', lat: 53.8668, lng: -1.7272, type: 'town', description: 'Market town', population: '14,000' },
  { id: 19, name: 'Ilkley', lat: 53.9217, lng: -1.8156, type: 'town', description: 'Spa town', population: '12,000' },
  { id: 20, name: 'Wetherby', lat: 53.9149, lng: -1.5849, type: 'town', description: 'Historic market town', population: '10,000' },
  { id: 21, name: 'Tadcaster', lat: 53.8792, lng: -1.4256, type: 'village', description: 'Historic village', population: '6,000' },
  { id: 22, name: 'Knaresborough', lat: 54.0013, lng: -1.4792, type: 'town', description: 'Historic market town', population: '7,000' },
  { id: 23, name: 'Ripon', lat: 54.1355, lng: -1.5286, type: 'city', description: 'Historic cathedral city', population: '17,000' },
  { id: 24, name: 'Skipton', lat: 54.0373, lng: -2.0156, type: 'town', description: 'Market town', population: '14,000' },
  { id: 25, name: 'Settle', lat: 54.1827, lng: -2.1355, type: 'village', description: 'Historic village', population: '2,400' },

  // South Yorkshire towns
  { id: 26, name: 'Rotherham', lat: 53.4331, lng: -1.3561, type: 'town', description: 'Historic town', population: '109,000' },
  { id: 27, name: 'Barnsley', lat: 53.5505, lng: -1.4827, type: 'town', description: 'Historic market town', population: '88,000' },
  { id: 28, name: 'Chesterfield', lat: 53.2334, lng: -1.4207, type: 'town', description: 'Historic market town', population: '115,000' },
  { id: 29, name: 'Worksop', lat: 53.3052, lng: -1.1939, type: 'town', description: 'Historic market town', population: '39,000' },
  { id: 30, name: 'Penistone', lat: 53.5023, lng: -1.6544, type: 'village', description: 'Historic village', population: '5,000' },
  { id: 31, name: 'Bolsover', lat: 53.2328, lng: -1.3051, type: 'village', description: 'Castle village', population: '8,000' },
  { id: 32, name: 'Thorne', lat: 53.4905, lng: -0.8889, type: 'town', description: 'Historic town', population: '7,000' },
  { id: 33, name: 'Bawtry', lat: 53.5048, lng: -0.9921, type: 'village', description: 'Historic village', population: '8,000' },
  { id: 34, name: 'Tickhill', lat: 53.4723, lng: -1.0742, type: 'village', description: 'Historic village', population: '2,000' },

  // East Riding of Yorkshire towns
  { id: 35, name: 'Beverley', lat: 53.8401, lng: -0.4337, type: 'town', description: 'Historic market town', population: '30,000' },
  { id: 36, name: 'Bridlington', lat: 54.1815, lng: -0.1894, type: 'town', description: 'Seaside resort', population: '32,000' },
  { id: 37, name: 'Goole', lat: 53.7093, lng: -0.7647, type: 'town', description: 'River port town', population: '18,000' },
  { id: 38, name: 'Pocklington', lat: 53.9606, lng: -0.7832, type: 'town', description: 'Market town', population: '8,000' },
  { id: 39, name: 'Market Weighton', lat: 53.8979, lng: -0.6456, type: 'village', description: 'Historic village', population: '2,500' },
  { id: 40, name: 'Howden', lat: 53.7529, lng: -0.8315, type: 'town', description: 'Historic market town', population: '3,500' },
  { id: 41, name: 'Hedon', lat: 53.7533, lng: -0.3214, type: 'village', description: 'Historic village', population: '3,000' },
  { id: 42, name: 'Patrington', lat: 53.6836, lng: -0.1698, type: 'village', description: 'Historic village', population: '1,200' },
  { id: 43, name: 'Hornsea', lat: 54.0029, lng: -0.2192, type: 'town', description: 'Seaside resort', population: '8,000' },
  { id: 44, name: 'Withernsea', lat: 53.8262, lng: -0.0286, type: 'town', description: 'Seaside town', population: '6,000' },

  // North Yorkshire towns and villages
  { id: 45, name: 'Harewood', lat: 53.8972, lng: -1.6089, type: 'village', description: 'Historic village', population: '1,500' },
  { id: 46, name: 'Guiseley', lat: 53.8655, lng: -1.7709, type: 'town', description: 'Historic town', population: '17,000' },
  { id: 47, name: 'Grassington', lat: 54.0567, lng: -2.0432, type: 'village', description: 'Historic village', population: '1,600' },
  { id: 48, name: 'Malham', lat: 54.0872, lng: -2.1267, type: 'village', description: 'Historic village', population: '400' },
  { id: 49, name: 'Hawkswick', lat: 54.1014, lng: -2.0988, type: 'village', description: 'Historic village', population: '300' },
  { id: 50, name: 'Litton', lat: 54.1228, lng: -2.0342, type: 'village', description: 'Historic village', population: '200' },
  { id: 51, name: 'Horton-in-Ribblesdale', lat: 54.1783, lng: -2.2344, type: 'village', description: 'Historic village', population: '500' },
  { id: 52, name: 'Clapham', lat: 54.1706, lng: -2.3034, type: 'village', description: 'Historic village', population: '400' },
  { id: 53, name: 'Ingleton', lat: 54.1903, lng: -2.3287, type: 'village', description: 'Historic village', population: '1,000' },
  { id: 54, name: 'Penrith', lat: 54.6639, lng: -2.7439, type: 'town', description: 'Historic market town', population: '15,000' },
  { id: 55, name: 'Appleby-in-Westmorland', lat: 54.5819, lng: -2.4853, type: 'town', description: 'Historic market town', population: '2,600' },
  { id: 56, name: 'Kirkby Stephen', lat: 54.4698, lng: -2.3903, type: 'town', description: 'Historic market town', population: '1,900' },
  { id: 57, name: 'Sedbergh', lat: 54.3245, lng: -2.5122, type: 'town', description: 'Market town', population: '2,600' },
  { id: 58, name: 'Kendal', lat: 54.3282, lng: -2.7458, type: 'town', description: 'Historic market town', population: '28,000' },

  // Calderdale and Colden Valley
  { id: 59, name: 'Haworth', lat: 53.8215, lng: -1.9765, type: 'village', description: 'Historic Brontë village', population: '5,000' },
  { id: 60, name: 'Hebden Bridge', lat: 53.7929, lng: -2.0257, type: 'town', description: 'Historic mill town', population: '4,500' },
  { id: 61, name: 'Mytholmroyd', lat: 53.8105, lng: -2.0447, type: 'village', description: 'Historic village', population: '2,000' },
  { id: 62, name: 'Heptonstall', lat: 53.8076, lng: -2.0493, type: 'village', description: 'Historic village', population: '800' },
  { id: 63, name: 'Oxenhope', lat: 53.8339, lng: -1.9993, type: 'village', description: 'Historic village', population: '5,000' },
  { id: 64, name: 'Stanbury', lat: 53.8379, lng: -1.9887, type: 'village', description: 'Historic village', population: '2,000' },
  { id: 65, name: 'Lumbutts', lat: 53.7803, lng: -2.0624, type: 'village', description: 'Historic village', population: '600' },
  { id: 66, name: 'Hani', lat: 53.7675, lng: -2.0842, type: 'village', description: 'Historic village', population: '400' },
  { id: 67, name: 'Pecket Well', lat: 53.7551, lng: -2.0289, type: 'village', description: 'Historic village', population: '500' },
  { id: 68, name: 'Wainsgate', lat: 53.7432, lng: -2.0566, type: 'village', description: 'Historic village', population: '300' },
  { id: 69, name: 'Cragg Vale', lat: 53.6923, lng: -1.9934, type: 'village', description: 'Historic village', population: '2,000' },

  // Wharfedale villages
  { id: 70, name: 'Addingham', lat: 53.9267, lng: -1.8876, type: 'town', description: 'Historic town', population: '4,500' },
  { id: 71, name: 'Silsden', lat: 53.9018, lng: -1.9123, type: 'town', description: 'Historic town', population: '5,000' },
  { id: 72, name: 'Steeton', lat: 53.8876, lng: -1.9456, type: 'village', description: 'Historic village', population: '5,000' },
  { id: 73, name: 'Sutton-in-Craven', lat: 53.8723, lng: -1.9234, type: 'village', description: 'Historic village', population: '2,000' },
  { id: 74, name: 'Cross Hills', lat: 53.8634, lng: -1.9087, type: 'village', description: 'Historic village', population: '4,500' },
  { id: 75, name: 'Cononley', lat: 53.8567, lng: -1.8945, type: 'village', description: 'Historic village', population: '1,500' },
  { id: 76, name: 'Kildwick', lat: 53.8489, lng: -1.8756, type: 'village', description: 'Historic village', population: '5,000' },
  { id: 77, name: 'Glusburn', lat: 53.8412, lng: -1.8623, type: 'village', description: 'Historic village', population: '2,000' },
  { id: 78, name: 'Farnhill', lat: 53.8334, lng: -1.8489, type: 'village', description: 'Historic village', population: '1,500' },
  { id: 79, name: 'Eastburn', lat: 53.8256, lng: -1.8354, type: 'village', description: 'Historic village', population: '2,500' },
  { id: 80, name: 'Carleton', lat: 53.8178, lng: -1.8219, type: 'village', description: 'Historic village', population: '800' },
  { id: 81, name: 'Wilsden', lat: 53.7946, lng: -1.7816, type: 'village', description: 'Historic village', population: '3,000' },

  // Additional market towns and villages
  { id: 82, name: 'Leyburn', lat: 54.3523, lng: -1.8456, type: 'town', description: 'Market town', population: '2,000' },
  { id: 83, name: 'Wensley', lat: 54.3234, lng: -1.8123, type: 'village', description: 'Historic village', population: '500' },
  { id: 84, name: 'Gayle', lat: 54.3127, lng: -2.1234, type: 'village', description: 'Historic village', population: '400' },
  { id: 85, name: 'Hawes', lat: 54.3245, lng: -2.2134, type: 'town', description: 'Market town', population: '800' },
  { id: 86, name: 'Bainbridge', lat: 54.3045, lng: -2.1834, type: 'village', description: 'Historic village', population: '600' },
  { id: 87, name: 'Sedbusk', lat: 54.3156, lng: -2.1945, type: 'village', description: 'Historic village', population: '400' },
  { id: 88, name: 'Askrigg', lat: 54.3367, lng: -2.1567, type: 'village', description: 'Historic village', population: '500' },
  { id: 89, name: 'Carperby', lat: 54.3234, lng: -2.1234, type: 'village', description: 'Historic village', population: '300' },
  { id: 90, name: 'Thoralby', lat: 54.3145, lng: -2.1123, type: 'village', description: 'Historic village', population: '200' },
  { id: 91, name: 'Newbiggin', lat: 54.3078, lng: -2.0945, type: 'village', description: 'Historic village', population: '150' },
  { id: 92, name: 'Middleham', lat: 54.2945, lng: -1.9345, type: 'village', description: 'Castle village', population: '500' },
  { id: 93, name: 'Coverham', lat: 54.2834, lng: -1.9456, type: 'village', description: 'Historic village', population: '400' },
  { id: 94, name: 'Jervaeux', lat: 54.2734, lng: -1.9567, type: 'village', description: 'Historic abbey village', population: '200' },
  { id: 95, name: 'Northallerton', lat: 54.3412, lng: -1.4234, type: 'town', description: 'Market town', population: '14,000' },
  { id: 96, name: 'Stokesley', lat: 54.4645, lng: -1.1234, type: 'town', description: 'Market town', population: '4,000' },
  { id: 97, name: 'Great Ayton', lat: 54.5678, lng: -0.9876, type: 'village', description: 'Historic village', population: '4,500' },
  { id: 98, name: 'Helmsley', lat: 54.2456, lng: -0.7234, type: 'town', description: 'Market town', population: '1,500' },
  { id: 99, name: 'Hovingham', lat: 54.2345, lng: -0.8456, type: 'village', description: 'Historic village', population: '800' },
  { id: 100, name: 'Nunnington', lat: 54.2234, lng: -0.8567, type: 'village', description: 'Historic village', population: '600' },
  { id: 101, name: 'Pickering', lat: 54.3845, lng: -0.7823, type: 'town', description: 'Historic market town', population: '7,000' },
  { id: 102, name: 'Thornton-le-Dale', lat: 54.4123, lng: -0.7456, type: 'village', description: 'Historic village', population: '1,200' },
  { id: 103, name: 'Goathland', lat: 54.4567, lng: -0.6234, type: 'village', description: 'Historic village', population: '800' },
  { id: 104, name: 'Whitby', lat: 54.4865, lng: -0.6234, type: 'town', description: 'Coastal resort town', population: '13,000' },
  { id: 105, name: 'Robin Hood Bay', lat: 54.4234, lng: -0.5234, type: 'village', description: 'Coastal village', population: '2,000' }
];

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

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const mapCenter = {
  lat: 53.963194,
  lng: -1.220817
};

const GoogleMapsComponent = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [boundaryPaths, setBoundaryPaths] = useState([]);
  const markersRef = useRef([]);
  const clusterRef = useRef(null);

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
  }, []);

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
        map,
        markers,
        algorithmOptions: {
            radius: 120 // Increase to 120 pixels (larger clusters, more spacing)
                        // Or decrease to 30 pixels (smaller clusters, less spacing)
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
        marker.addListener('click', () => {
          setSelectedCity(location);
          map.panTo(marker.getPosition());
        });
      });
    }
  }, []);

  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleCloseInfo = useCallback(() => {
    setSelectedCity(null);
  }, []);

  // Handle ESC key press to close modal and manage focus
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseInfo();
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
  }, [selectedCity, handleCloseInfo]);

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
        {/* Regional Boundary - Navy Blue Dashed Lines */}
        {boundaryPaths.map((path, index) => (
          <Polyline
            key={`boundary-${index}`}
            path={path}
            options={BOUNDARY_OPTIONS}
            aria-label={`Yorkshire and The Humber region boundary segment ${index + 1}`}
          />
        ))}

        {/* Bottom Slide-Up Modal - shows when marker is clicked */}
        {selectedCity && (
          <div className="modal-overlay" onClick={handleCloseInfo} role="presentation" aria-hidden="false">
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
                  onClick={handleCloseInfo}
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
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsComponent;
