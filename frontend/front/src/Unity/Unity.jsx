import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import * as AvatarActions from "./AvatarActions";
import { GetUnityFunctions } from "./UnityService";
import "./Unity.css";

let actionStatus = { "setting": false, "start": false, "rootSearch": false, "finishPootSearch": false, "decideRoot": false, "move": false, "arrive": false };
let relationship = "1";
let username = "ああ";
let moveSectionPlace = "金閣寺";
let arrivePlace = "金閣寺";
let sendMoveSectionPlace = relationship + "、" + username + "、" + moveSectionPlace;
let sendArrivePlace = relationship + "、" + username + "、" + arrivePlace;

let arrivePlace1 = "1.111、1.111";
let arrivePlace2 = "2.222、2.222";
let arrivePlace3 = "3.333、3.333";
let sendArrivePlace1 = relationship + "、" + username + "、" + arrivePlace1;
let sendArrivePlace2 = relationship + "、" + username + "、" + arrivePlace2;
let sendArrivePlace3 = relationship + "、" + username + "、" + arrivePlace3;

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
        <button id="moveHiddenButton" onClick={() => AvatarActions.move(sendMessage, sendMoveSectionPlace)}>Setting</button>
        <button id="arriveHiddenButton" onClick={() => AvatarActions.arrive(sendMessage, sendArrivePlace)}>Setting</button>

        <button id="arrive1HiddenButton" onClick={() => AvatarActions.arrive(sendMessage, sendArrivePlace1)}>Setting</button>
        <button id="arrive2HiddenButton" onClick={() => AvatarActions.arrive(sendMessage, sendArrivePlace2)}>Setting</button>
        <button id="arrive3HiddenButton" onClick={() => AvatarActions.arrive(sendMessage, sendArrivePlace3)}>Setting</button>

        <button id="HiddenButton">hidden</button>
        <div className="AvatarText"><p>{`${text}`}</p></div>
        <Unity unityProvider={unityProvider} className="AvatarCanvas" />

      </div>
    </Fragment>
  );
}
