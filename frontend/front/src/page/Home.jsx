import React from "react";
import { Link } from "react-router-dom";
import StartButton from "../components/StartButton";
import SetButton from "../components/SetButton";
import Button from "../components/Button";

function Home() {

  return (
    <div className="home">
      <h1>TabitaRO</h1>
      <Link to="/setting">Setting</Link>
      {/* <StartButton />
      <SetButton /> */}
      <Button to="/setting" label="start" hiddenButtonId={"settingHiddenButton"} />
    </div>
  );
}

export default Home;
