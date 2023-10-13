import React from "react";
import ApiCaller from "../components/ApiCaller";
import Button from "../components/Button";

const Select_plan = () => {
  return (
    <div>
      <Button to="/Destination" label="back page" />
      <ApiCaller url={"https://official-joke-api.appspot.com/jokes/random"} />
    </div>
  );
};

export default Select_plan;
