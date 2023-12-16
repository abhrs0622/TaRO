import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLatitude } from "../features/latitude/latitudeSlice";
import { setLongitude } from "../features/longitude/longitudeSlice";

const Map = () => {
  const latitude = useSelector((state) => state.latitude.value);
  const longitude = useSelector((state) => state.longitude.value);
  const dispatch = useDispatch();

  const container = {
    width: "75%",
    height: "70vh",
  };

  const defaultPosition = {
    lat: latitude,
    lng: longitude,
  };

  const [markerPosition, setMarkerPosition] = useState(defaultPosition);

  const handleMapClick = (e) => {
    const clickedLatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setMarkerPosition(clickedLatLng);
    dispatch(setLatitude(e.latLng.lat()));
    dispatch(setLongitude(e.latLng.lng()));
  };

  return (
    <>
      <div className="wrap">
        <LoadScript
          id="google-map"
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_STREETVIEW_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={container}
            center={markerPosition}
            zoom={15}
            onClick={handleMapClick}
          >
            {markerPosition && <MarkerF position={markerPosition} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
};

export default Map;
