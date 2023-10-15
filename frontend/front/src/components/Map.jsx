import React, { useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { setLatitude } from "../features/latitude/latitudeSlice";
import { setLongitude } from "../features/longitude/longitudeSlice";

const Map = () => {
  const latitude = useSelector((state) => state.latitude.value);
  const longitude = useSelector((state) => state.longitude.value);
  const dispatch = useDispatch();

  const container = {
    width: "75%",
    height: "500px",
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
          googleMapsApiKey="AIzaSyDwcIO3U_TFaSghaoAoZHSwN3zpih3uc6E"
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
