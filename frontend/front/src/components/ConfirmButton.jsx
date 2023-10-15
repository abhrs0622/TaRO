import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPlans } from "../features/plans/plansSlice";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ConfirmButton = ({ to, label, hiddenButtonId }) => {
  const latitude = useSelector((state) => state.latitude.value);
  const longitude = useSelector((state) => state.longitude.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const hiddenButton = document.getElementById(hiddenButtonId);
    hiddenButton.click();
    setLoading(true);
    await fetch(
      "http://localhost:8080/map?value=" +
      String(latitude.payload) +
      "," +
      String(longitude.payload),
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
        const plans = data.data.map((planData) => planData.plan);
        console.log(plans);

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
        <button onClick={handleClick}>{label}</button>
      )}
    </div>
  );
};

export default ConfirmButton;
