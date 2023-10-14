import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import * as AvatarActions from "./AvatarActions";
import { GetUnityFunctions } from "./UnityService";
import "./Unity.css";

let actionStatus = { "setting": false, "start": false, "rootSearch": false, "finishPootSearch": false, "decideRoot": false, "move": false, "arrive": false };
let moveSectionPlace = "金閣寺";
let arrivePlace = "金閣寺";
let userMessage = "メッセージ";
//AvatarActions.changeAllStatus(false);


export function Avatar() {

  // avatar data

  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState("");

  const { unityProvider, sendMessage, addEventListener, removeEventListener } = GetUnityFunctions();


  //take data from unity to react

  const handleText = useCallback((text) => {
    setText(text);
  }, []);
  const handleStartTime = useCallback((startTime) => {
    setStartTime(startTime);
  }, []);

  useEffect(() => {
    addEventListener("avatarText", handleText);
    return () => {
      removeEventListener("avaterText", handleText);
    };
  }, [addEventListener, removeEventListener, handleText]);

  useEffect(() => {
    addEventListener("startSpeakTime", handleStartTime);
    return () => {
      removeEventListener("startSpeakTime", handleStartTime);
    };
  }, [addEventListener, removeEventListener, handleStartTime]);



  const changeAllStatus = (isAllStatus) => {
    actionStatus.setting = isAllStatus;
    actionStatus.start = isAllStatus;
    actionStatus.rootSearch = isAllStatus;
    actionStatus.finishPootSearch = isAllStatus;
    actionStatus.decideRoot = isAllStatus;
    actionStatus.move = isAllStatus;
    actionStatus.arrive = isAllStatus;
  };


  const textLength = text.length;
  const waitTimeFromStartVoice = 0.2 * Number(textLength) * 1000;

  const [buttonVisibility, setButtonVisibility] = useState('hidden');

  const displayNextButton = () => {
    setTimeout(function () {
      console.log("ボタン表示関数");
      if (actionStatus.setting == true) {
        console.log("ボタン表示処理")
        setButtonVisibility('visible');
      }
    }, waitTimeFromStartVoice);
  };
  useEffect(displayNextButton, [startTime]);
  return (
    <Fragment>
      <div className="Avatar">
        <button id="settingHiddenButton" onClick={() => AvatarActions.setting(sendMessage)}>Setting</button>
        <button id="startHiddenButton" onClick={() => AvatarActions.start(sendMessage)}>Setting</button>
        <button id="rootSearchHiddenButton" onClick={() => AvatarActions.rootSearch(sendMessage)}>Setting</button>
        <button id="finishRootSearchHiddenButton" onClick={() => AvatarActions.finishRootSearch(sendMessage)}>Setting</button>
        <button id="decideRootHiddenButton" onClick={() => AvatarActions.decideRoot(sendMessage)}>Setting</button>
        <button id="moveHiddenButton" onClick={() => AvatarActions.move(sendMessage, moveSectionPlace)}>Setting</button>
        <button id="ariveHiddenButton" onClick={() => AvatarActions.arrive(sendMessage, arrivePlace)}>Setting</button>

        <button style={{ visibility: buttonVisibility }}>next</button>
        <div className="AvatarText"><p>{`${text}`}</p></div>
        <Unity unityProvider={unityProvider} className="AvatarCanvas" />

      </div>
    </Fragment>
  );
}
