import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
    const container = {
        width: "75%",
        height: "500px"
      };
      
      const position = {
        lat: 35.182253007459444,
        lng: 136.90534328438358
      };
      return (
        <>
          <h2>React_Google Map_Sample</h2>
          <div className="wrap">
            <LoadScript googleMapsApiKey="AIzaSyDwcIO3U_TFaSghaoAoZHSwN3zpih3uc6E">
              <GoogleMap mapContainerStyle={container} center={position} zoom={15}>
              </GoogleMap>
            </LoadScript>
          </div>
        </>
      )
}

export default Map