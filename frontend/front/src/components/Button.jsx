import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ to, label, hiddenButtonId, disable, style }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
    const hiddenButton = document.getElementById(hiddenButtonId);
    hiddenButton.click();
  };
  let setDisable;
  if (disable == undefined) {
    setDisable = false;
  } else {
    setDisable = disable;
  }


  return <div className="buttonParent"><button onClick={handleClick} disabled={setDisable} style={style}>{label}</button></div>;
};

export default Button;
