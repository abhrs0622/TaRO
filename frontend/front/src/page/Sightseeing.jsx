import React from 'react'
import Street from "../components/StreetView";
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";

const Sightseeing = () => {
  const navigate = useNavigate();
  const handleClick = (to) => {
    navigate(to);
  };
  return (
    <div>
      <Street />
      <Button to="/Load" label="次の場所へ" hiddenButtonId="moveHiddenButton" />
      <button onClick={() => handleClick("/")}>終了</button>
    </div>
  )
}

export default Sightseeing