# Yorkshire and The Humber - Interactive Map POC

An accessible, mobile-first React 16 application featuring an interactive Google Maps component showcasing major cities in Yorkshire and The Humber region.

## Features

- **Interactive Google Maps**: Displays the Yorkshire and The Humber region with a dashed navy blue boundary line
- **City Markers**: 8 major cities with clickable markers showing detailed information
- **Info Windows**: Click on markers to view city information including population and coordinates
- **Mobile-First Design**: Optimized for mobile devices with responsive controls
- **Accessibility**: WCAG AA compliant with ARIA labels, semantic HTML, and keyboard navigation support
- **Region Boundary**: Automatic bounds fitting to display the entire region on screen load

## Tech Stack

- **React**: 16.14.0 (latest React 16 with hooks support)
- **Google Maps API**: @react-google-maps/api
- **Webpack**: 5 (bundler)
- **Babel**: 7 (JavaScript transpiler)
- **Node.js**: Compatible with 12.x, 14.x, 16.x

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

The Google Maps API key is configured in `src/GoogleMapsComponent.js`:

```javascript
const GOOGLE_MAPS_API_KEY = 'AIzaSyCJcQHAjA6-T_u8VrhAxxdeRZ-3c037qIU';
```

## Development

Start the development server with hot reload:

```bash
npm start
```

The application will start at `http://localhost:3000` and automatically open in your browser.

## Build

Create a production build:

```bash
npm run build
```

Output files will be in the `dist/` directory.

## Project Structure

```
googlemap/
├── public/
│   ├── index.html                    # HTML template with accessibility features
│   └── yorkshire-geojson.json        # Regional boundary geodata
├── src/
│   ├── index.js                      # React entry point
│   ├── App.js                        # Main app component
│   ├── App.css                       # App styles with mobile-first approach
│   ├── GoogleMapsComponent.js        # Google Maps POC component
│   └── GoogleMapsComponent.css       # Map component styles
├── webpack.config.js                 # Webpack configuration
├── .babelrc                          # Babel configuration
├── package.json                      # Project dependencies
└── README.md                         # This file
```

## Component Features

### GoogleMapsComponent.js

#### Cities Included
1. **Leeds** - Major city and economic centre (793,000)
2. **Sheffield** - Historic industrial city (584,000)
3. **Bradford** - Major city in West Yorkshire (349,000)
4. **Hull** - Historic port city (259,000)
5. **York** - Historic cathedral city (210,000)
6. **Doncaster** - Historic market town (302,000)
7. **Wakefield** - Cathedral city (343,000)
8. **Harrogate** - Historic spa town (80,000)

#### Key Features
- **Markers**: Each city has an interactive marker with hover effects
- **Info Windows**: Displays city name, description, population, and coordinates
- **Region Boundary**: Navy blue dashed polyline showing the approximate Yorkshire and The Humber boundary
- **Map Controls**: Zoom, pan, fullscreen, and street view controls positioned for mobile use
- **Auto-fit Bounds**: Map automatically zooms to fit all cities on initial load

## Accessibility Features

The application follows WCAG AA standards:

### Semantic HTML
- Proper heading hierarchy
- Semantic elements (`<main>`, `<region>`)
- Skip-to-content link for keyboard navigation

### ARIA Labels
- All interactive elements have descriptive labels
- Map regions labeled with purpose
- Info windows marked as regions with descriptive labels

### Keyboard Navigation
- All controls are keyboard accessible
- Tab navigation supported
- Enter/Space activation for buttons

### Visual Design
- High contrast navy blue boundary (navy #00003F)
- Clear visual hierarchy
- Support for high contrast mode preference
- Reduced motion support (`prefers-reduced-motion`)

### Mobile Accessibility
- Responsive touch targets
- Proper viewport configuration
- Text remains readable at all zoom levels
- Controls positioned for thumb-friendly access

## Usage

1. The map loads centered on Yorkshire and The Humber
2. Click on any city marker to view information
3. Use map controls for zoom, pan, and fullscreen
4. Click "Close" button in info window to hide it
5. Map bounds automatically fit all cities on load

## Mobile-First Responsive Design

The application is designed mobile-first with breakpoints at:
- **768px**: Tablet adjustments
- **480px**: Small mobile device adjustments

### Responsive Features
- Full-viewport map display
- Touch-friendly controls
- Optimized info window sizing
- Readable text at all sizes

## API Configuration

### Google Maps API Key
The project uses a specific API key configured in `GoogleMapsComponent.js`. This key has the following APIs enabled:
- Maps JavaScript API
- Places API (optional, for future enhancement)

## Data Sources

- **Yorkshire and The Humber Boundary**: Retrieved from UK Planning Data (Open Government Licence v3.0)
  - Source: https://www.staging.planning.data.gov.uk/entity/30100002
  - Reference: statistical-geography:E12000003

- **City Coordinates**: Standard geographic coordinates (WGS84)
- **City Information**: General knowledge data about major UK cities

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy-loaded Google Maps library
- Optimized marker rendering
- Efficient info window management
- Minimized bundle size with webpack 5

## Future Enhancements

- [ ] Real-time location tracking
- [ ] Search functionality for cities
- [ ] Distance calculator between cities
- [ ] Historical data visualization
- [ ] Integration with local services API
- [ ] Offline map support
- [ ] Dark mode theme

## Troubleshooting

### Map Not Loading
- Check Google Maps API key is valid
- Ensure API key has Maps JavaScript API enabled
- Check browser console for errors

### Markers Not Appearing
- Verify city coordinates are correct
- Check map zoom level
- Ensure bounds calculation is working

### Info Window Not Opening
- Click directly on the marker (not the label)
- Check browser console for JavaScript errors

## License

Open Government Licence v3.0 (for geodata)

## Support

For issues or questions about the map data, contact: digitalland@communities.gov.uk
