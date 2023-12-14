import React from 'react'
import YouTube from '../components/YouTube';

import Button from "../components/Button";
import "./css/Load.css";
import { SwitchDisable } from '../components/SwitchDisable';

const Load = () => {
  const disable = SwitchDisable().disable;
  const disableStyle = SwitchDisable().disableStyle;
  return (
    <div>
      <h2>移動中...</h2>
      <div className='video'>
        <YouTube />
      </div>
      <div className="next_button_parent">
        <Button to="/Sightseeing" label="次の場所へ" hiddenButtonId="arrive1HiddenButton" disable={disable} style={disableStyle} />
      </div>
    </div>
  )
}

export default Load