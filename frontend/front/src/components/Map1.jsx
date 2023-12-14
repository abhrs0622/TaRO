import React, { useEffect, useState } from "react";
import ReactStreetview from "react-google-streetview";

const Map1 = () => {
  const googleMapsApiKey = process.env.REACT_APP_MAP_API_KEY;
  const [positions, setpositions] = useState({
    lat: 24.9178,
    lng: 67.0972,
  });
  useEffect(() => {
    console.log("POSITIONS", positions);
  });
  const streetViewPanoramaOptions = {
    position: { lat: positions.lat, lng: positions.lng },
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
    addressControl: true,
    showRoadLabels: true,
    zoomControl: true,
  };

  return (
    <div
      style={{
        width: "800px",
        height: "450px",
        backgroundColor: "#eeeeee",
      }}
    >
      <ReactStreetview
        apiKey={googleMapsApiKey}
        streetViewPanoramaOptions={streetViewPanoramaOptions}
      />
    </div>
  );
};

export default Map1;
