import React from "react";

import GET from "../components/ApiGet";
// import POST from "../components/ApiPost";
import Button from "../components/Button";
import Course from "../components/Course";
import { useSelector } from "react-redux";

const SelectPlan = () => {
  const plans = useSelector((state) => state.plans.value);

  const Places = [];

  return (
    <div>
      <Button to="/Destination" label="back page" />

      <GET url={"https://official-joke-api.appspot.com/jokes/random"} />
      {/* <POST url="https://jsonplaceholder.typicode.com/posts" requestData={{ key: 'value' ,aaa : "test"}} /> */}
    </div>
  );
};

export default SelectPlan;
