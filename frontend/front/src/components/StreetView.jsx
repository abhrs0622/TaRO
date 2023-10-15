import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const container = {
    width: "75%",
    height: "500px",
  };

  const defaultPosition = {
    lat: 35.182253007459444,
    lng: 136.90534328438358,
  };

  const [markerPosition, setMarkerPosition] = useState(defaultPosition);

  const handleMapClick = (e) => {
    const clickedLatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    // ピンの位置を更新
    setMarkerPosition(clickedLatLng);

    // クリックされた位置の緯度と経度をコンソールに出力
    console.log("クリックされた位置の緯度:", clickedLatLng.lat);
    console.log("クリックされた位置の経度:", clickedLatLng.lng);
  };

  return (
    <>
      <h2>React_Google Map_Sample</h2>
      <div className="wrap">
        <LoadScript id ="2" googleMapsApiKey="AIzaSyDwcIO3U_TFaSghaoAoZHSwN3zpih3uc6E">
          <GoogleMap
            mapContainerStyle={container}
            center={defaultPosition}
            zoom={15}
            onClick={handleMapClick}
          >
            {/* ピンを立てる */}
            <Marker position={markerPosition} />
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
};

export default Map;
