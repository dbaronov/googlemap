import React from 'react';
import { Helmet } from 'react-helmet';
import GoogleMapsComponent from './GoogleMapsComponent';
import './App.css';

function App() {
  return (
    <>
      <Helmet>
        <title>Yorkshire and The Humber - Interactive Map</title>
        <meta
          name="description"
          content="Interactive Google Map showing major cities in Yorkshire and The Humber region with accessibility features."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <main role="main" aria-label="Yorkshire and The Humber interactive map application">
        <GoogleMapsComponent />
      </main>
    </>
  );
}

export default App;
