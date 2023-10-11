import React from "react";
import { Link } from "react-router-dom";
import StartButton from "../components/StartButton";
import SetButton from "../components/SetButton";
import Button from "../components/Button";

function Home() {
  return (
    <div className="home">
      <h1>Hello! World.</h1>
      <p>今日から本気出す。</p>
      <Link to="/setting">Setting</Link>
      {/* <StartButton />
      <SetButton /> */}
      <Button to="/setting" label="next page" />
    </div>
  );
}

export default Home;
