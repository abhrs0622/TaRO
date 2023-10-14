import React from "react";
import { Link } from "react-router-dom";
import StartButton from "../components/StartButton";
import SetButton from "../components/SetButton";
import Button from "../components/Button";
import { setting } from "../Unity/AvatarActions";
import { GetUnityFunctions } from "../Unity/UnityService";

function Home() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = GetUnityFunctions();

  return (
    <div className="home">
      <h1>Hello! World.</h1>
      <p>今日から本気出す。</p>
      <Link to="/setting">Setting</Link>
      {/* <StartButton />
      <SetButton /> */}
      <Button to="/setting" label="next page" hiddenButtonId={"settingHiddenButton"} />
    </div>
  );
}

export default Home;
