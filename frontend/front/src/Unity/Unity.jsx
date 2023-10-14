import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import * as AvatarActions from "./AvatarActions";

let actionStatus = { "setting": false, "start": false, "rootSearch": false, "finishPootSearch": false, "decideRoot": false, "move": false, "arrive": false };
let moveSectionId = 1;
let arrivePlace = "金閣寺";
let userMessage = "メッセージ";
//AvatarActions.changeAllStatus(false);

export function Avatar() {

  // avatar data

  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState("");

  //Connect Unity

  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "build/build_v2.5.loader.js",
    dataUrl: "build/build_v2.5.data",
    frameworkUrl: "build/build_v2.5.framework.js",
    codeUrl: "build/build_v2.5.wasm",
  });


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


  //send data from react to unity

  const googleApiKey = process.env.REACT_APP_GOOGLE_RECOGNITION_API_KEY;
  const backendApiServerUrl = process.env.REACT_APP_BACKEND_API_SERVER_URL;
  const VoicevoxEndpointUrl = process.env.REACT_APP_VOICEVOX_ENDPOINT_URL;

  function configUnityApi() {
    sendMessage("ChatdollKitVRM", "googleApiKey", googleApiKey);
    sendMessage("ChatdollKitVRM", "WakewordGoogleApiKey", googleApiKey);
    sendMessage("ChatdollKitVRM", "RequestProviderGoogleApyKey", googleApiKey);
    sendMessage("ChatdollKitVRM", "backendApiServerUrl", backendApiServerUrl);
    sendMessage("ChatdollKitVRM", "VoicevoxEndpointUrl", VoicevoxEndpointUrl);
  }

  configUnityApi();


  const changeAllStatus = (isAllStatus) => {
    actionStatus.setting = isAllStatus;
    actionStatus.start = isAllStatus;
    actionStatus.rootSearch = isAllStatus;
    actionStatus.finishPootSearch = isAllStatus;
    actionStatus.decideRoot = isAllStatus;
    actionStatus.move = isAllStatus;
    actionStatus.arrive = isAllStatus;
  };

  //avatar actions
  /*
    function awake() {
      sendMessage("ChatdollKitVRM", "awake");
    }
    function sleep() {
      sendMessage("ChatdollKitVRM", "sleep");
    }
    function setting() {
      changeAllStatus(false);
      actionStatus.setting = true;
      console.log(actionStatus.setting);
      sendMessage("ChatdollKitVRM", "setting");
    }
    function start() {
      changeAllStatus(false);
      actionStatus.start = true;
      sendMessage("ChatdollKitVRM", "start");
    }
    function rootSearch() {
      changeAllStatus(false);
      actionStatus.rootSearch = true;
      sendMessage("ChatdollKitVRM", "rootSearch");
    }
    function finishRootSearch() {
      changeAllStatus(false);
      actionStatus.finishPootSearch = true;
      sendMessage("ChatdollKitVRM", "finishRootSearch");
    }
    function decideRoot() {
      changeAllStatus(false);
      actionStatus.decideRoot = true;
      sendMessage("ChatdollKitVRM", "decideRoot");
    }
    function move() {
      changeAllStatus(false);
      actionStatus.move = true;
      sendMessage("ChatdollKitVRM", "move", moveSectionId);
    }
    function arrive() {
      changeAllStatus(false);
      actionStatus.arrive = true;
      sendMessage("ChatdollKitVRM", "arrive", arrivePlace);
    }
    function sendMessageToAvatar() {
      sendMessage("ChatdollKitVRM", "sendMessageToAvatar", userMessage);
    }
  */

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
      <div class="Avatar">
        <button onClick={() => AvatarActions.setting(sendMessage)}>Setting</button>
        <button style={{ visibility: buttonVisibility }}>next</button>
        <div className="AvatarText"><p>{`${text}`}</p></div>
        <Unity unityProvider={unityProvider} className="AvatarCanvas" />

      </div>
    </Fragment>
  );
}
