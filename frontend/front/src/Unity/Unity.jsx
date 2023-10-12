import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const [text, setText] = useState();
  const [startTime, setStartTime] = useState();

  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "build/build_v1.9.loader.js",
    dataUrl: "build/build_v1.9.data",
    frameworkUrl: "build/build_v1.9.framework.js",
    codeUrl: "build/build_v1.9.wasm",
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

  function configUnityApi() {
    sendMessage("ChatdollKitVRM", "googleApiKey", "AIzaSyAgwA_FF52h7Fl8TFK19E5cAWyG4H7ri0k");
    sendMessage("ChatdollKitVRM", "WakewordGoogleApiKey", "AIzaSyAgwA_FF52h7Fl8TFK19E5cAWyG4H7ri0k");
    sendMessage("ChatdollKitVRM", "RequestProviderGoogleApyKey", "AIzaSyAgwA_FF52h7Fl8TFK19E5cAWyG4H7ri0k");
    sendMessage("ChatdollKitVRM", "backendApiServerUrl", "http://127.0.0.1:5000");
    sendMessage("ChatdollKitVRM", "VoicevoxEndpointUrl", "http://localhost:50021");
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
  function move() {
    sendMessage("ChatdollKitVRM", "move", 1);
  }
  function arrive() {
    sendMessage("ChatdollKitVRM", "arrive", "金閣寺");
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