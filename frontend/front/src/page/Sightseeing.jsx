import React, { useState } from 'react';
import Street from "../components/StreetView";
import Button from "../components/Button";

const Sightseeing = () => {
  const position = [[33.56793280754822, 133.6677199608504], [34.344327666436314, 134.0426996864438], [38.265074709977505, 134.24368309932896]]; // 位置情報の配列
  const [i, setI] = useState(0);

  const incrementI = () => {
    if (i < position.length - 1) {
      setI(i + 1);
    }
  };
  if (i === (position.length -1)){
    console.log({i})
    return(
      <div>
      <Street
        latitude={position[i][0]}
        longitude={position[i][1]}
      />
        <button onClick={incrementI}>owata</button>
        <Button
          label="何でや？"
          hiddenButtonId="hiddenButton"
          onClick={incrementI}
        />
    </div>
    );
  }else{
    console.log({i})
    return(
      <div>
      <Street
        latitude={position[i][0]}
        longitude={position[i][1]}
      />
    <button onClick={incrementI}>次</button>
      </div>
    )
  }
}

export default Sightseeing;