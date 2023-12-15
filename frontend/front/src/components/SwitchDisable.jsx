import { ManageDisplyButton } from "../Unity/ManageDisplayButton";
import { useState, useEffect } from "react";

export const SwitchDisable = () => {
    const [disable, setDisable] = useState(true);
    const [disableStyle, setDisableStyle] = useState({ opacity: 0.6 })
    useEffect(() => {
    }, [])
    const startTime = ManageDisplyButton().startTime;
    const interval = Number(ManageDisplyButton().interval);
    useEffect(() => {
        if (startTime !== "") {
            setTimeout(() => {
                setDisable(false)
                setDisableStyle({ opacity: 1 })
            }, interval)
        }
    }, [startTime])
    return ({
        disable: disable,
        disableStyle: disableStyle
    })
}