import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import * as AvatarActions from "./AvatarActions";
import { GetUnityFunctions } from "./UnityService";
import "./Unity.css";
import { useSelector, useDispatch } from "react-redux";
import { setLatitude } from "../features/latitude/latitudeSlice";
import { setLongitude } from "../features/longitude/longitudeSlice";
import { AvatarText } from "./GetAvatarText";

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


  //communicate with avatar

  const [sendText, setSendText] = useState("");

  const handleChangeSendText = (e) => {
    setSendText(e.target.value);
  };

  const sendTextToAvatar = (sendText) => {
    console.log(sendText);
    if (sendText == "") {
      alert("メッセージを入力してください。");
    } else {
      //api post
      const userMessage = sendText;
      AvatarActions.sendMessageToAvatar(sendMessage, userMessage);
      setSendText("");
    }
  };

  const { unityProvider, sendMessage, addEventListener, removeEventListener } = GetUnityFunctions();

  const text = AvatarText();
  const [disabled, setDisabled] = useState(true);
  const [disabledStyle, setDisabledStyle] = useState({ opacity: 0.6, cursor: "wait" });
  setTimeout(
    () => {
      setDisabled(false);
      setDisabledStyle({ opacity: 1, cursor: "pointer" });
    },
    7000);
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
        <div className="sendText">
          <textarea placeholder="アバターへのメッセージを入力してください。" value={sendText} onChange={handleChangeSendText} />
          <button className="sendTextButton" onClick={() => sendTextToAvatar(sendText)} disabled={disabled} style={disabledStyle}>send</button>
        </div>
        <div className="AvatarText"><p>{`${text}`}</p></div>
        <Unity unityProvider={unityProvider} className="AvatarCanvas" />

      </div>
    </Fragment>
  );
}
