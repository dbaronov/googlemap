# Quick Start Guide

## Prerequisites
- Node.js installed (v12+, currently using v18.17.1)
- npm installed (v6+)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Getting Started (5 minutes)

### 1. Start the Development Server
```bash
cd /Users/denissbar/Git/YW/googlemap
npm start
```

The application will automatically open at `http://localhost:3000`

### 2. Explore the Map
- The map displays Yorkshire and The Humber region
- 8 major cities are marked with blue pins
- Navy blue dashed line shows the regional boundary

### 3. Interact with the Map
**Click on city markers** to see information:
- City name and description
- Population
- Geographic coordinates

**Use map controls:**
- **Zoom**: Mouse wheel or zoom buttons
- **Pan**: Click and drag
- **Fullscreen**: Press fullscreen button
- **Street View**: Click street view button

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start dev server with hot reload |
| `npm run dev` | Start and auto-open in browser |
| `npm run build` | Create production build in `dist/` |
| `npm test` | Run tests (configure jest if needed) |

## File Locations

| File | Purpose |
|------|---------|
| `src/GoogleMapsComponent.js` | Main map component |
| `src/App.js` | Application wrapper |
| `src/App.css` | Global styles |
| `public/index.html` | HTML entry point |
| `webpack.config.js` | Webpack bundler config |
| `.babelrc` | Babel transpiler config |

## Making Changes

### To Edit the Map Component
1. Open `src/GoogleMapsComponent.js`
2. Make changes
3. Save file
4. Browser automatically refreshes (hot reload)

### To Add New Cities
1. Add to `CITIES` array in `GoogleMapsComponent.js`:
```javascript
{
  id: 9,
  name: 'New City',
  lat: 53.xxxx,
  lng: -1.xxxx,
  description: 'City description',
  population: '123,000'
}
```

### To Change Map Styling
1. Edit `src/GoogleMapsComponent.css`
2. Or modify map options in `GoogleMapsComponent.js`

### To Modify Boundary Line
1. Edit `YORKSHIRE_BOUNDARY` array in `GoogleMapsComponent.js`
2. Change coordinates or styling options

## Mobile Testing

### Test on Your Device
```bash
# Get your local IP address
# Then visit: http://YOUR_IP:3000
```

### Using Chrome DevTools
1. Press F12 to open DevTools
2. Click device toggle (top-left)
3. Select a mobile device
4. Test interactions

## Troubleshooting

### Map Not Loading
- Check if port 3000 is available
- Verify Google Maps API key is valid
- Check browser console (F12) for errors

### Changes Not Reflecting
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check webpack compilation in terminal
- Look for error messages in console

### Performance Issues
- Current bundle: 296 KiB (acceptable)
- For production, enable code splitting in webpack
- Consider lazy-loading Google Maps

## Project Structure Overview

```
googlemap/
├── public/              # Static assets
│   └── index.html      # HTML template
├── src/                # React components
│   ├── GoogleMapsComponent.js   # Map POC
│   ├── App.js          # Main app
│   ├── index.js        # Entry point
│   └── *.css           # Styles
├── webpack.config.js   # Build config
└── package.json        # Dependencies
```

## Next Steps

### For Development
1. Add more features to the map
2. Implement search functionality
3. Add data filtering
4. Create additional views

### For Production
1. Build: `npm run build`
2. Deploy `dist/` folder to web server
3. Set up environment variables for API key
4. Configure CDN for static assets

## Accessibility Features

The map is built with WCAG AA accessibility in mind:
- ✓ Keyboard navigation support
- ✓ Screen reader compatible
- ✓ High contrast boundary line
- ✓ Mobile-friendly
- ✓ Skip-to-content link
- ✓ Semantic HTML

For detailed testing: See `ACCESSIBILITY_TESTING.md`

## Key Locations in Code

| Item | Location |
|------|----------|
| Google Maps API Key | `src/GoogleMapsComponent.js` line 7 |
| City Data | `src/GoogleMapsComponent.js` lines 10-56 |
| Boundary Coordinates | `src/GoogleMapsComponent.js` lines 58-72 |
| Map Styling | `src/GoogleMapsComponent.css` |
| Map Options | `src/GoogleMapsComponent.js` handleMapLoad |

## Learning Resources

- React 16 Docs: https://reactjs.org/
- Google Maps API: https://developers.google.com/maps/documentation/javascript
- Webpack: https://webpack.js.org/
- Babel: https://babeljs.io/

## Getting Help

### Check Documentation
- README.md - Comprehensive project documentation
- POC_IMPLEMENTATION_SUMMARY.md - What was built and why
- ACCESSIBILITY_TESTING.md - Testing procedures

### Debug Steps
1. Check browser console (F12)
2. Look at webpack output in terminal
3. Verify API key is valid
4. Test in different browser
5. Clear cache and hard refresh

## Common Tasks

### Change Map Center
Edit line in `GoogleMapsComponent.js`:
```javascript
const mapCenter = {
  lat: 53.963194,    // Change latitude
  lng: -1.220817     // Change longitude
};
```

### Modify Boundary Color
Edit `.info-window-content` in `GoogleMapsComponent.js`:
```javascript
{
  strokeColor: '#00003F',  // Navy blue - change here
  strokeOpacity: 0.8,
  strokeWeight: 3
}
```

### Adjust Zoom Level
Edit in `GoogleMapsComponent.js`:
```javascript
<GoogleMap
  zoom={8}  // Change zoom level (1-21)
  // ...
>
```

## Tips & Tricks

- **Hot Reload**: Changes auto-reload without refreshing
- **DevTools**: Use React DevTools extension for component debugging
- **Console**: `console.log()` in components for debugging
- **Network Tab**: Check API responses in DevTools Network tab
- **Performance**: Use Lighthouse in DevTools to check performance

## FAQ

**Q: Can I deploy this?**
A: Yes! Run `npm run build` and deploy the `dist/` folder

**Q: How do I change the API key?**
A: Edit `src/GoogleMapsComponent.js` line 7

**Q: Is this production-ready?**
A: It's a POC. For production, add error handling, testing, and optimize bundle size

**Q: Can I add more cities?**
A: Yes! Add them to the `CITIES` array in GoogleMapsComponent.js

**Q: How do I modify the boundary?**
A: Edit `YORKSHIRE_BOUNDARY` array in GoogleMapsComponent.js

---

**Ready to start?** Run `npm start` and open http://localhost:3000
