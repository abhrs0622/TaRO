import React from "react";
import GET from "../components/ApiGet";
import Button from "../components/Button";

const Select_plan = () => {
  return (
    <div>
      <Button to="/Destination" label="back page" />
      <GET url={"https://official-joke-api.appspot.com/jokes/random"} />
    </div>
  );
};

export default Select_plan;
