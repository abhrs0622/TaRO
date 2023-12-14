import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import * as AvatarActions from "./AvatarActions";
import { GetUnityFunctions } from "./UnityService";
import "./Unity.css";
import { useSelector, useDispatch } from "react-redux";
import { setLatitude } from "../features/latitude/latitudeSlice";
import { setLongitude } from "../features/longitude/longitudeSlice";
import { AvatarText } from "./GetAvatarText";
import { ManageDisplyButton } from "./ManageDisplayButton";


let actionStatus = { "setting": false, "start": false, "rootSearch": false, "finishPootSearch": false, "decideRoot": false, "move": false, "arrive": false };



let userMessage = "メッセージ";
//AvatarActions.changeAllStatus(false);


export function Avatar() {
  const coordinate = useSelector((state) => state.coordinate.value);
  const name = useSelector((state) => state.name.value);
  const rel = useSelector((state) => state.relationship.value);
  let relationship;
  let username;
  let moveSectionPlace;
  let sendMoveSectionPlace;
  let arrivePlace1;
  let arrivePlace2;
  let arrivePlace3;
  let sendArrivePlace1;
  let sendArrivePlace2;
  let sendArrivePlace3;
  if (coordinate != "init") {
    relationship = String(rel);
    username = String(name);

    moveSectionPlace = String(coordinate[0][0]) + "、" + String(coordinate[0][1]);
    sendMoveSectionPlace = relationship + "、" + username + "、" + moveSectionPlace;


    arrivePlace1 = String(coordinate[0][0]) + "、" + String(coordinate[0][1]);
    arrivePlace2 = coordinate[1][0] + "、" + coordinate[1][1];
    arrivePlace3 = coordinate[2][0] + "、" + coordinate[2][1];


    sendArrivePlace1 = relationship + "、" + username + "、" + arrivePlace1;
    sendArrivePlace2 = relationship + "、" + username + "、" + arrivePlace2;
    sendArrivePlace3 = relationship + "、" + username + "、" + arrivePlace3;
  }

  const { unityProvider, sendMessage, addEventListener, removeEventListener } = GetUnityFunctions();

  console.log(ManageDisplyButton());
  const text = AvatarText();

  // avatar data

  // const [text, setText] = useState("");
  // const [startTime, setStartTime] = useState("");

  //take data from unity to react

  // const handleText = useCallback((text) => {
  //   setText(text);
  // }, []);
  // const handleStartTime = useCallback((startTime) => {
  //   setStartTime(startTime);
  // }, []);

  // useEffect(() => {
  //   addEventListener("avatarText", handleText);
  //   return () => {
  //     removeEventListener("avatarText", handleText);
  //   };
  // }, [addEventListener, removeEventListener, handleText]);

  // useEffect(() => {
  //   addEventListener("startSpeakTime", handleStartTime);
  //   return () => {
  //     removeEventListener("startSpeakTime", handleStartTime);
  //   };
  // }, [addEventListener, removeEventListener, handleStartTime]);

  // useEffect(() => {
  //   setText("from component" + AvatarText());
  // }, [AvatarText]);

  // const changeAllStatus = (isAllStatus) => {
  //   actionStatus.setting = isAllStatus;
  //   actionStatus.start = isAllStatus;
  //   actionStatus.rootSearch = isAllStatus;
  //   actionStatus.finishPootSearch = isAllStatus;
  //   actionStatus.decideRoot = isAllStatus;
  //   actionStatus.move = isAllStatus;
  //   actionStatus.arrive = isAllStatus;
  // };


  // const textLength = text.length;
  // const waitTimeFromStartVoice = 0.2 * Number(textLength) * 1000;

  // const [buttonVisibility, setButtonVisibility] = useState('hidden');

  // const displayNextButton = () => {
  //   setTimeout(function () {
  //     console.log("ボタン表示関数");
  //     if (actionStatus.setting == true) {
  //       console.log("ボタン表示処理")
  //       setButtonVisibility('visible');
  //     }
  //   }, waitTimeFromStartVoice);
  // };
  // useEffect(displayNextButton, [startTime]);
  return (
    <Fragment>
      <div className="Avatar">
        <button id="settingHiddenButton" onClick={() => AvatarActions.setting(sendMessage)}>Setting</button>
        <button id="startHiddenButton" onClick={() => AvatarActions.start(sendMessage)}>Setting</button>
        <button id="rootSearchHiddenButton" onClick={() => AvatarActions.rootSearch(sendMessage)}>Setting</button>
        <button id="finishRootSearchHiddenButton" onClick={() => AvatarActions.finishRootSearch(sendMessage)}>Setting</button>
        <button id="decideRootHiddenButton" onClick={() => AvatarActions.decideRoot(sendMessage)}>Setting</button>
        <button id="moveHiddenButton" onClick={() => AvatarActions.move(sendMessage, sendMoveSectionPlace)}>Setting</button>

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
