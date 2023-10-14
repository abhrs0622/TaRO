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
    <div className="setting">
      <Button to="/" label="back page" />
      <div className="username"><h2>名前</h2></div>
      <div className="relationship"><h2>
        アバターとの関係性
      </h2>
        <Radio
          options={options1}
          selectedOption={selectedOption1}
          onOptionChange={handleOptionChange1}
        /></div>
      <div className="course"><h2>
        コース内容
      </h2>
        <Radio
          options={options2}
          selectedOption={selectedOption2}
          onOptionChange={handleOptionChange2}
        /></div>
      <Button to="/Destination" label="next page" hiddenButtonId="startHiddenButton" />
    </div>
  );
};

export default Setting;
