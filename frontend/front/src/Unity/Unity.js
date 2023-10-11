import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import './Unity.css';

function App() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/build_v1.0.loader.js",
    dataUrl: "build/build_v1.0.data",
    frameworkUrl: "build/build_v1.0.framework.js",
    codeUrl: "build/build_v1.0.wasm",
  });

  return <Unity unityProvider={unityProvider}  className="Unity"/>;
}

export default App;