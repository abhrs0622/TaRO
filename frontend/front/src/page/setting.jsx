import React, { useState } from "react";
import Radio from "../components/Radio";
import Button from "../components/Button";

const options1 = [
  { value: "option1", label: "恋人" },
  { value: "option2", label: "友達" },
  { value: "option3", label: "推し" },
];

const options2 = [
  { value: "option1", label: "おしゃべりコース" },
  { value: "option2", label: "ポイントめぐるだけコース" },
];

const Setting = () => {
  const [selectedOption1, setSelectedOption1] = useState(options1[0].value);
  const [selectedOption2, setSelectedOption2] = useState(options2[0].value);

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  return (
    <div>
      名前
      <br />
      アバターとの関係性
      <br />
      <Radio
        options={options1}
        selectedOption={selectedOption1}
        onOptionChange={handleOptionChange1}
      />
      <br />
      コース内容
      <br />
      <Radio
        options={options2}
        selectedOption={selectedOption2}
        onOptionChange={handleOptionChange2}
      />
      <br />
      map設定へgo
      <br />
      <Button to="/Destination" label="next page" hiddenButtonId="startHiddenButton" />
    </div>
  );
};

export default Setting;
