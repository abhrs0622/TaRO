import React, { useState } from "react";
import Radio from "../components/Radio";
import Button from "../components/Button";

  // radio button
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
  // 文字入力
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <Button to="/" label="back page" />
      <br />
      名前
      <br />
      <input
        type="text"
        value={inputText} // 入力ボックスの値をstateから取得
        onChange={handleInputChange} // テキストが変更されたときのハンドラー
      />
      <p>入力された文字: {inputText}</p> {/* 変数に格納された文字を表示 */}
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
      <Button to="/Destination" label="next page" />
    </div>
  );
};

export default Setting;
