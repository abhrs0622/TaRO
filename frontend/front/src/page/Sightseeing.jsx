import React, { useState } from 'react';
import Street from "../components/StreetView";
import Button from "../components/Button";
import Streetview from 'react-google-streetview';
import { useSelector, useDispatch } from "react-redux";


const Sightseeing = () => {
  const coordinate = useSelector((state) => state.coordinate.value);
  const position = [[parseFloat(coordinate[0][0]), parseFloat(coordinate[0][1])], [parseFloat(coordinate[1][0]), parseFloat(coordinate[1][1])], [parseFloat(coordinate[2][0]), parseFloat(coordinate[2][1])]]; // 位置情報の配列
  const [i, setI] = useState(0);

  const incrementI = () => {
    if (i < position.length - 1) {
      setI(i + 1);
    }
  };
  return (
    <div>
      <Streetview
        apiKey="AIzaSyDwcIO3U_TFaSghaoAoZHSwN3zpih3uc6E"
        streetViewPanoramaOptions={{
          position: { lat: 135, lng: 35 }, // 任意の場所の緯度経度
        }} // あなたのGoogle Street View APIキー
      // 他の必要なプロパティを指定
      />{2 - i ? <button onClick={incrementI}>次の場所へ</button> : <Button
        to="/"
        label="終了"
        hiddenButtonId="HiddenButton"
        onClick={incrementI}
      />}
    </div>
  );
}

export default Sightseeing;