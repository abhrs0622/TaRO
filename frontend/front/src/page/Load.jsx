import React from 'react'
import YouTube from '../components/YouTube';

import Button from "../components/Button";
import "./css/Load.css";

const Load = () => {
  return (
    <div>
      <h2>移動中...</h2>
      <div className='video'>
        <YouTube />
      </div>
      <div className="next_button_parent">
        <Button to="/Sightseeing" label="次の場所へ" hiddenButtonId="arrive1HiddenButton" />
      </div>
    </div>
  )
}

export default Load