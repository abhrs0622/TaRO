import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const [text, setText] = useState();
  const [startTime, setStartTime] = useState();

  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "build/build_v2.5.loader.js",
    dataUrl: "build/build_v2.5.data",
    frameworkUrl: "build/build_v2.5.framework.js",
    codeUrl: "build/build_v2.5.wasm",
  });

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


  function awake() {
    sendMessage("ChatdollKitVRM", "awake");
  }
  function sleep() {
    sendMessage("ChatdollKitVRM", "sleep");
  }
  function setting() {
    sendMessage("ChatdollKitVRM", "setting");
  }
  function start() {
    sendMessage("ChatdollKitVRM", "start");
  }
  function rootSearch() {
    sendMessage("ChatdollKitVRM", "rootSearch");
  }
  function finishRootSearch() {
    sendMessage("ChatdollKitVRM", "finishRootSearch");
  }
  function decideRoot() {
    sendMessage("ChatdollKitVRM", "decideRoot");
  }
  const moveSectionId = 1;
  function move() {
    sendMessage("ChatdollKitVRM", "move", moveSectionId);
  }
  const arrivePlace = "金閣寺";
  function arrive() {
    sendMessage("ChatdollKitVRM", "arrive", arrivePlace);
  }
  const userMessage = "メッセージ";
  function sendMessageToAvatar() {
    sendMessage("ChatdollKitVRM", "sendMessageToAvatar", userMessage);
  }
  return (
    <Fragment>
      <Unity unityProvider={unityProvider} />
      <button onClick={setting}>Setting</button>
      <button onClick={awake}>wake</button>
      <button onClick={sleep}>sleep</button>

      <p>{`${text},${startTime}`}</p>
    </Fragment>
  );
}

export default App;