import { useEffect, useState, useCallback } from "react";
import { GetUnityFunctions } from "./UnityService";
import { AvatarText } from "./GetAvatarText";
import { start } from "./AvatarActions";

export function ManageDisplyButton() {
    const { unityProvider, sendMessage, addEventListener, removeEventListener } = GetUnityFunctions();
    const [startTime, setStartTime] = useState("");

    const handleStartTime = useCallback((startTime) => {
        setStartTime(String(startTime));
    }, []);

    useEffect(() => {
        addEventListener("startSpeakTime", handleStartTime);
        return () => {
            removeEventListener("startSpeakTime", handleStartTime);
        };
    }, [addEventListener, removeEventListener, handleStartTime]);

    const text = AvatarText();
    const textLength = text.length;
    const interval = 0.2 * Number(textLength) * 1000;
    return ({ startTime: startTime, interval: interval })
}