import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import Map1 from "../components/Map1";

const Sightseeing = () => {
  const coordinate = useSelector((state) => state.coordinate.value);
  const position = [
    [parseFloat(coordinate[0][0]), parseFloat(coordinate[0][1])],
    [parseFloat(coordinate[1][0]), parseFloat(coordinate[1][1])],
    [parseFloat(coordinate[2][0]), parseFloat(coordinate[2][1])],
  ]; // 位置情報の配列
  const [i, setI] = useState(0);
  const incrementI = () => {
    if (i < position.length - 1) {
      setI(i + 1);
    }
  };
  return (
    <div>
      <Map1 />
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
