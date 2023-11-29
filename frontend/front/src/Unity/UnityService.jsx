import { useUnityContext } from "react-unity-webgl";

export function GetUnityFunctions() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "Build/build_v2.6.loader.js",
    dataUrl: "Build/build_v2.6.data",
    frameworkUrl: "Build/build_v2.6.framework.js",
    codeUrl: "Build/build_v2.6.wasm",
  });

  //send config from react to unity

  const googleApiKey = process.env.REACT_APP_GOOGLE_RECOGNITION_API_KEY;
  const backendApiServerUrl = process.env.REACT_APP_BACKEND_API_SERVER_URL + "/avatar";
  const VoicevoxEndpointUrl = process.env.REACT_APP_VOICEVOX_ENDPOINT_URL;

  console.log(googleApiKey);
  console.log(VoicevoxEndpointUrl);

  
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

