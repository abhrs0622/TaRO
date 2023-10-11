import React from "react";
import { Link } from "react-router-dom";
import StartButton from "../components/StartButton";
import SetButton from "../components/SetButton";

function Home() {
  return (
    <div className="home">
      <h1>Hello! World.</h1>
      <p>今日から本気出す。</p>
      <Link to="/setting">Setting</Link>
      <StartButton />
      <SetButton />
    </div>
  );
}

export default Home;
