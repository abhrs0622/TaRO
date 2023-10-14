import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ to, label, avatarAction, avatarActionArgs1, avatarActionArgs2 }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
    if (avatarAction) {
      avatarAction();
    }
  };


  return <button onClick={handleClick}>{label}</button>;
};

export default Button;
