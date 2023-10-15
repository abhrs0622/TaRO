import React from 'react'
import YouTube from '../components/YouTube';
import Button from "../components/Button";

const Load = () => {
  return (
    <div><YouTube/>
    <Button to="/Sightseeing" label="next page" hiddenButtonId="startHiddenButton" /></div>
  )
}

export default Load