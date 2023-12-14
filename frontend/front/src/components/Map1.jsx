import React, { useEffect, useState } from "react";
import ReactStreetview from "react-google-streetview";
import PropTypes from "prop-types";

const Map1 = ({ position }) => {
  const googleMapsApiKey = process.env.REACT_APP_MAP_API_KEY;
  const [positions, setpositions] = useState({
    lat: position[0],
    lng: position[1],
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
  console.log(position);
  console.log(position[0]);
  console.log(position[1]);
  return (
    <div
      style={{
        width: "800px",
        height: "450px",
        backgroundColor: "000000",
      }}
    >
      <ReactStreetview
        apiKey={googleMapsApiKey}
        streetViewPanoramaOptions={streetViewPanoramaOptions}
      />
    </div>
  );
};

Map1.propTypes = {
  position: PropTypes.array.isRequired,
};

export default Map1;
