import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ to, label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return <button onClick={handleClick}>{label}</button>;
};

export default Button;
