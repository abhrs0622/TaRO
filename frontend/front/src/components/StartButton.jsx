import React from 'react'
import { useNavigate } from "react-router-dom"

const StartButton = () => {
  const navigate = useNavigate()
    return (
    <button onClick={() => navigate('/setting')}>
        Start
    </button>
    );
}


export default StartButton