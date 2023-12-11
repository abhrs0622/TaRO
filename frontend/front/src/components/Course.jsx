import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPlan } from "../features/selectedPlan/selectedPlanSlice";
import { setCoordinate } from "../features/coordinate/coordinateSlice";

const Course = ({ id, plans, xy, hiddenButtonId }) => {
  const selectedPlan = useSelector((state) => state.selectedPlan.value);
  const dispatch = useDispatch();



  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setSelectedPlan(plans));
    const coordinates = [];

    for (let i = 0; i < xy.length; i++) {
      console.log("xy", xy[i][0], xy[i][1]);
      coordinates.push([parseFloat(xy[i][0]), parseFloat(xy[i][1])]);
    }
    dispatch(setCoordinate(xy));
    console.log(coordinates);
    navigate("/Rec");
    const hiddenButton = document.getElementById(hiddenButtonId);
    hiddenButton.click();
  };

  return (
    <button className="plan" onClick={handleClick}>
      <span>{id}</span>
      {(() => {
        const items = [];
        for (let i = 0; i < plans.length; i++) {
          items.push(<span>{plans[i]}</span>);
          if (i != plans.length - 1) {
            items.push(<br></br>);
          }
        }
        return <ul>{items}</ul>;
      })()}
    </button>
  );
};

export default Course;
