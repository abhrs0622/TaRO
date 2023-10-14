import React from "react";
import GET from "../components/ApiGet";
// import POST from "../components/ApiPost";
import Button from "../components/Button";

const Select_plan = () => {
  return (
    <div>
      <Button to="/Destination" label="back page" />
      <GET url={"https://official-joke-api.appspot.com/jokes/random"} />
      {/* <POST url="https://jsonplaceholder.typicode.com/posts" requestData={{ key: 'value' ,aaa : "test"}} /> */}
      <Button to="/Rec" label="プランA" hiddenButtonId="decideRootHiddenButton" />
      <Button to="/Rec" label="プランB" hiddenButtonId="decideRootHiddenButton" />
      <Button to="/Rec" label="プランC" hiddenButtonId="decideRootHiddenButton" />
    </div>
  );
};

export default Select_plan;
