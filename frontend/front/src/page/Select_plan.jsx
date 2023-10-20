import React from "react";
import Button from "../components/Button";
import Course from "../components/Course";
import { useSelector } from "react-redux";

const SelectPlan = () => {
  const plans = useSelector((state) => state.plans.value);

  const Places = [];

  return (
    <div>
      <Button to="/Destination" label="back page" />
      {(() => {
        const Boxes = [];
        for (let i = 0; i < plans.length; i++) {
          const items = [];
          const xy = [];
          for (let j = 0; j < Math.min(plans[i].length, 3); j++) {
            items.push(plans[i][j]["place"]);
            console.log("aa", parseFloat(plans[i][j]["latitude"]));
            xy.push([plans[i][j]["latitude"], plans[i][j]["longitude"]]);
          }
          Places.push(items);
          Boxes.push(<Course id={i + 1} plans={items} xy={xy} hiddenButtonId="decideRootHiddenButton"></Course>);
        }
        return Boxes;
      })()}
    </div>
  );
};

export default SelectPlan;
