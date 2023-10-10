import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import './Unity.css';

function App() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/build_connect_to_backend.loader.js",
    dataUrl: "build/build_connect_to_backend.data",
    frameworkUrl: "build/build_connect_to_backend.framework.js",
    codeUrl: "build/build_connect_to_backend.wasm",
  });

  return <Unity unityProvider={unityProvider}  className="Unity"/>;
}

export default App;