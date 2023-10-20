import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ to, label, hiddenButtonId }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
    const hiddenButton = document.getElementById(hiddenButtonId);
    hiddenButton.click();
  };


  return <div className="buttonParent"><button onClick={handleClick}>{label}</button></div>;
};

export default Button;
