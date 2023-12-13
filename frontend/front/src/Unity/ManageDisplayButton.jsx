import { useEffect, useState, useCallback } from "react";
import { GetUnityFunctions } from "./UnityService";
import { AvatarText } from "./GetAvatarText";

export function ManageDisplyButton() {
    const { unityProvider, sendMessage, addEventListener, removeEventListener } = GetUnityFunctions();
    const [startTime, setStartTime] = useState("");

    const handleStartTime = useCallback((startTime) => {
        setStartTime(startTime);
    }, []);

    useEffect(() => {
        addEventListener("startSpeakTime", handleStartTime);
        return () => {
            removeEventListener("startSpeakTime", handleStartTime);
        };
    }, [addEventListener, removeEventListener, handleStartTime]);

    const text = AvatarText();
    const textLength = text.length;
    const waitTimeFromStartVoice = 0.2 * Number(textLength) * 1000;

    console.log(startTime)
}