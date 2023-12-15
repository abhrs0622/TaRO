import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import ReactStreetview from "react-google-streetview";

const Sightseeing = () => {
  const coordinate = useSelector((state) => state.coordinate.value);
  const position = [
    [parseFloat(coordinate[0][0]), parseFloat(coordinate[0][1])],
    [parseFloat(coordinate[1][0]), parseFloat(coordinate[1][1])],
    [parseFloat(coordinate[2][0]), parseFloat(coordinate[2][1])],
  ]; // 位置情報の配列
  const [i, setI] = useState(0);
  const [positions, setPositions] = useState({
    lat: position[i][0],
    lng: position[i][1],
  });
  const incrementI = () => {
    if (i < position.length - 1) {
      setI(i + 1);
      setPositions({
        lat: position[i + 1][0],
        lng: position[i + 1][1],
      });
    }
  };

  // map関連
  const googleMapsApiKey = process.env.REACT_APP_MAP_API_KEY;
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
    <div>
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
      <div className="next_button_parent">
        {2 - i ? (
          <button onClick={incrementI}>次の場所へ</button>
        ) : (
          <Button
            to="/"
            label="終了"
            hiddenButtonId="HiddenButton"
            onClick={incrementI}
          />
        )}
      </div>
    </div>
  );
};

export default Sightseeing;
