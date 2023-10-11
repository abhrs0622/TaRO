import React from 'react'
import { useNavigate } from "react-router-dom"

const SetButton = () => {
  const navigate = useNavigate()
    return (
      <button onClick={() => navigate('/Setting_option')}>
        Set
      </button>
    );
  }


export default SetButton