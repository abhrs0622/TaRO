import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "build/build_v1.1.loader.js",
    dataUrl: "build/build_v1.1.data",
    frameworkUrl: "build/build_v1.1.framework.js",
    codeUrl: "build/build_v1.1.wasm",
  });

  function awake() {
    sendMessage("ChatdollKitVRM", "awake");
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
    sendMessage("ChatdollKitVRM", "move",1);
  }
  function arrive() {
    sendMessage("ChatdollKitVRM", "arrive","金閣寺");
  }

  return (
    <Fragment>
      <Unity unityProvider={unityProvider} />
      <button onClick={setting}>Setting</button>
    </Fragment>
  );
}

export default App;