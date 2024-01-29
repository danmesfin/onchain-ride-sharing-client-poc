"use client"

import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";

type GeoJsonPoint = {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; 
  };
  properties: {
    id: string;
    name: string;
  };
};

type GeoJsonFeatureCollection = {
  type: 'FeatureCollection';
  features: GeoJsonPoint[];
};



const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 1,
  });
  const [size, setSize] = useState(50);

  const handleSliderChange = (event: any) => {
    setSize(event.target.value);
  };

  // State for the selected location
  const [selectedLocation, setSelectedLocation] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);

  const handleMapClick = (event: any) => {

    // Check if event.lngLat is defined and is an object
    if (event.lngLat && typeof event.lngLat === 'object') {

      const { lng, lat } = event.lngLat;
      setSelectedLocation({
        longitude: lng,
        latitude: lat
      });
      console.log(`Longitude: ${lng}, Latitude: ${lat}`);
    }
  };

  // Function to fetch current location
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setSelectedLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Fetch current location on component mount
    fetchCurrentLocation();
  }, []);

  return (
    <div className='flex min-h-screen'>
      <div className='w-full'>
        <Map
          mapLib={import('mapbox-gl')}
          initialViewState={{
            longitude: 38.74776,
            latitude: 9.047,
            zoom: 12,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          style={{ width: '100%', height: '100%' }}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          onClick={handleMapClick}
        >

          <NavigationControl />
          <GeolocateControl />
        </Map>
      </div>
    </div>
  );
};
export default MapComponent