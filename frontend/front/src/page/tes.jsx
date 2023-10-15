import React, { useState } from 'react';
import Street from "../components/StreetView";
import Button from "../components/Button";

const Sightseeing = () => {
  const position = [[33.56793280754822, 133.6677199608504], [34.344327666436314, 134.0426996864438], [34.265074709977505, 134.24368309932896]]; // 位置情報の配列
  const [i, setI] = useState(0);

  const incrementI = () => {
    if (i < position.length - 1) {
      setI(i + 1);
    }
  };
  if (i === (position.length -1)){
    return(
      <div>
        <Street
          initialLatitude={position[i][0]}
          initialLongitude={position[i][1]}
        />
        {/* <button onClick={incrementI}>owata</button> */}
        <Button to="/" label="owata" hiddenButtonId="startHiddenButton" />
    </div>
    );
  }else{
    return(
      <div>
      <Street
        initialLatitude={position[i][0]}
        initialLongitude={position[i][1]}
      />
    <Button to="/Load" label="next page" hiddenButtonId="startHiddenButton" onClick={incrementI} />
      </div>
    )
  }

}

export default Sightseeing;
