import { useUnityContext } from "react-unity-webgl";

export function GetUnityFunctions() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "build/build_v2.5.loader.js",
    dataUrl: "build/build_v2.5.data",
    frameworkUrl: "build/build_v2.5.framework.js",
    codeUrl: "build/build_v2.5.wasm",
  });


  //send config from react to unity

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
  return { unityProvider, sendMessage, addEventListener, removeEventListener };
}

