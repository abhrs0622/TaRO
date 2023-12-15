import React, { useState } from "react";
import { Link } from "react-router-dom";
// import StartButton from "../components/StartButton";
// import SetButton from "../components/SetButton";
import Button from "../components/Button";
import "./css/Home.css";

function Home() {
  const [disabled, setDisabled] = useState(true);
  const [disabledStyle, setDisabledStyle] = useState({ opacity: 0.6, cursor: "wait" });
  const [subTitle, setSubTitle] = useState("バーチャルガイドと接続中です")
  setTimeout(
    () => {
      setDisabled(false);
      setDisabledStyle({ opacity: 1, cursor: "pointer" });
      setSubTitle("～旅するバーチャルガイド～");
    },
    7000);

  return (
    <div className="home">
      <h1>TabitaRO</h1>
      <h2>{subTitle}</h2>
      <Button to="/setting" label="start" hiddenButtonId={"settingHiddenButton"} disable={disabled} style={disabledStyle} />
    </div>
  );
}

export default Home;
