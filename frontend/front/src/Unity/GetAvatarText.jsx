import { useEffect, useState, useCallback } from "react";
import { GetUnityFunctions } from "./UnityService";

export const AvatarText = () => {
    const [text, setText] = useState("");

    const { unityProvider, sendMessage, addEventListener, removeEventListener } = GetUnityFunctions();


    //take data from unity to react

    const handleText = useCallback((text) => {
        setText(text);
    }, []);

    useEffect(() => {
        addEventListener("avatarText", handleText);
        return () => {
            removeEventListener("avatarText", handleText);
        };
    }, [addEventListener, removeEventListener, handleText]);
    return text;
}