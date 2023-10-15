import React from "react";
import Direction from "../components/Direction";
import Button from "../components/Button";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const Route_rec = () => {
  const latitude = useSelector((state) => state.latitude.value);
  const longitude = useSelector((state) => state.longitude.value);

  const container = {
    width: "75%",
    height: "500px",
  };

  const defaultPosition = {
    lat: latitude,
    lng: longitude,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDwcIO3U_TFaSghaoAoZHSwN3zpih3uc6E",
  });

  if (isLoaded) {
    return (
      <div>
        <GoogleMap
          mapContainerStyle={container}
          center={defaultPosition}
          zoom={13}
        >
          <Direction />
        </GoogleMap>
        <Button to="/Load" label="go" hiddenButtonId="moveHiddenButton" />
      </div>
    );
  } else {
    return <></>;
  }
}

export default Route_rec;
