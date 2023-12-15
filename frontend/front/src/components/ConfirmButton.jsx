import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPlans } from "../features/plans/plansSlice";

const ConfirmButton = ({ to, label, hiddenButtonId, disable, disableStyle }) => {
  const latitude = useSelector((state) => state.latitude.value);
  const longitude = useSelector((state) => state.longitude.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const hiddenButton = document.getElementById(hiddenButtonId);
    hiddenButton.click();
    setLoading(true);
    console.log(String(latitude.payload), String(longitude.payload));
    var lat = String(latitude.payload);
    var lon = String(longitude.payload);
    if (latitude.payload === undefined) {
      lat = "35.6852";
      lon = "139.7528";
    }

    await fetch(
      process.env.REACT_APP_BACKEND_API_SERVER_URL +
        "/map?lat=" +
        lat +
        "&lon=" +
        lon,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Fetchエラー: ${response.status} - ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        var plans = data.data.map((planData) => planData.plan);
        console.log("get plans:", plans);
        console.log(typeof plans);
        console.log("length of plans: ", plans.length);
        dispatch(setPlans(plans));
      })
      .catch((error) => {
        console.error("Fetchエラー:", error);
      });

    navigate(to);
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <button onClick={handleClick} disabled={disable} style={disableStyle}>{label}</button>
      )}
    </div>
  );
};

export default ConfirmButton;
