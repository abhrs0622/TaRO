// マップ表示部分
import React, { useState } from "react";
import Map from "../components/Map";
//import RadioRe from "../components/Radio_relationship";
import Radio from "../components/Radio";
import Button from "../components/Button";

const options1 = [
  { value: "option1", label: "食べ歩き" },
  { value: "option2", label: "観光名所巡り" },
];

const options2 = [
  { value: "option1", label: "5分" },
  { value: "option2", label: "10分" },
  { value: "option2", label: "15分" },
];

const Destination = () => {
  const [selectedOption1, setSelectedOption1] = useState(options1[0].value);
  const [selectedOption2, setSelectedOption2] = useState(options2[0].value);

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  return (
    <div className="Destination">
      <Button to="/setting" label="back page" />
      <Map />
      <Radio
        options={options1}
        selectedOption={selectedOption1}
        onOptionChange={handleOptionChange1}
      />
      <br />
      <Radio
        options={options2}
        selectedOption={selectedOption2}
        onOptionChange={handleOptionChange2}
      />
      <Button to="/Select" label="next page" />
    </div>
  );
};

export default Destination;
