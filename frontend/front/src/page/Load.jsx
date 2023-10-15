import React from 'react'
import YouTube from '../components/YouTube';
import Button from '../components/Button';

const Load = () => {
  return (
    <div>
      <YouTube />
      <Button to="/Sightseeing" label="次の場所へ" hiddenButtonId="arrive1HiddenButton" />
    </div>
  )
}

export default Load