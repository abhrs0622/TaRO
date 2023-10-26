import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPlans } from "../features/plans/plansSlice";

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
      process.env.REACT_APP_BACKEND_API_SERVER_URL +
        "/map?value=" +
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
      .catch((error) => {
        console.error("Fetchエラー:", error);
      });

    //
    await new Promise((resolve) => setTimeout(resolve, 30000));

    var plans;

    while (true) {
      await fetch(process.env.REACT_APP_BACKEND_API_SERVER_URL + "/get-plans", {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Fetchエラー: ${response.status} - ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          plans = data.data.map((planData) => planData.plan);
          console.log("get plans:", plans);
          console.log(typeof plans);
          console.log("length of plans: ", plans.length);
          // dispatch(setPlans(plans));
        })
        .catch((error) => {
          console.error("Fetchエラー:", error);
        });
      if (plans.length !== 0) {
        dispatch(setPlans(plans));
        break;
      }
      // setTimeout(function () {
      //   console.log("10秒経過");
      // }, 10000);
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }

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
