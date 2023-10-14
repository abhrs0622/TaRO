// import React, { useEffect, useMemo } from "react";
// import { LoadScript, GoogleMap, StreetViewPanorama } from "@react-google-maps/api";

// const apiKey = "AIzaSyDwcIO3U_TFaSghaoAoZHSwN3zpih3uc6E"; // 自分のGoogle Maps APIキーを入力してください

// function StreetView() {
//   const fenway = useMemo(() => ({ lat: 42.345573, lng: -71.098326 }), []); // fenwayオブジェクトをキャッシュ

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initialize`;
//     script.async = true;
//     document.body.appendChild(script);

//     window.initialize = () => {
//       const mapOptions = {
//         center: fenway,
//         zoom: 14,
//       };

//       const panoramaOptions = {
//         position: fenway,
//         pov: {
//           heading: 34,
//           pitch: 10,
//         },
//       };

//       const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
//       const panorama = new window.google.maps.StreetViewPanorama(document.getElementById("pano"), panoramaOptions);

//       map.setStreetView(panorama);
//     };
//   }, [fenway]); // 'fenway' を依存関係として指定

//   return (
//     <div>
//       <LoadScript googleMapsApiKey={apiKey}>
//         <GoogleMap
//           id="map"
//           mapContainerStyle={{
//             height: "400px",
//             width: "600px",
//           }}
//         />
//         <StreetViewPanorama
//           id="pano"
//           visible
//           options={{
//             position: fenway,
//             pov: {
//               heading: 34,
//               pitch: 10,
//             },
//           }}
//         />
//       </LoadScript>
//     </div>
//   );
// }

// export default StreetView;

import React from 'react';
import { GoogleMap, StreetViewPanorama, LoadScript } from '@react-google-maps/api';

const StreetViewComponent = () => {
  // Define your location using lat and lng coordinates
  const location = { lat: 40.748817, lng: -73.985428 }; // Replace with your desired location

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <LoadScript
        googleMapsApiKey="YOUR_API_KEY" // Replace with your Google Maps API key
      >
        <GoogleMap
          center={location}
          zoom={14} // You can adjust the initial zoom level
        >
          <StreetViewPanorama
            position={location}
            visible
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default StreetViewComponent;
