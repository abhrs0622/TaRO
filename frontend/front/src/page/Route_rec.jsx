import React from "react";
import Direction from "../components/Direction";
import Button from "../components/Button";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import "./css/Route_rec.css";
import { SwitchDisable } from "../components/SwitchDisable";

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
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_STREETVIEW_API_KEY
  });
  const disable = SwitchDisable().disable;
  const disableStyle = SwitchDisable().disableStyle;
  if (isLoaded) {
    return (
      <div className="route_map">
        <GoogleMap
          mapContainerStyle={container}
          center={defaultPosition}
          zoom={13}
        >
          <Direction />
        </GoogleMap>
        <div className="next_button_parent">
          <Button to="/Load" label="go" hiddenButtonId="moveHiddenButton" />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Route_rec;
