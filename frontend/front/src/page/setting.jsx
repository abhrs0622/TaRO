import React, { useState } from "react";
import Radio from "../components/Radio";
import Button from "../components/Button";
import ApiPost from "../components/ApiPost";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../features/name/nameSlice";
import { setRelationship } from "../features/relationship/relationshipSlice";
import "./css/setting.css";

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
  // const name = useSelector((state) => state.name.value);
  // const relationship = useSelector((state) => state.relationship.value);
  const dispatch = useDispatch();

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

  // データ整形
  const handlePostRequest = () => {
    dispatch(setName(inputText));
    dispatch(setRelationship(selectedOption1));
    const url = "https://jsonplaceholder.typicode.com/posts";
    const requestData = {
      name: inputText, // 名前を含むデータを作成
      relationship: selectedOption1, // 関係性を含むデータを作成
      course: selectedOption2, // コースを含むデータを作成
    };

    return <ApiPost url={url} requestData={requestData} />;
  };

  return (
    <>
      <div className="back_button_parent">
        <Button to="/" label="←" />
      </div>
      <div className="setting">
        <div className="username">
          <h2>名前</h2>
          <div className="input_parent">
            <input
              type="text"
              value={inputText} // 入力ボックスの値をstateから取得
              onChange={handleInputChange} // テキストが変更されたときのハンドラー
            />
          </div>
        </div>
        <div className="relationship">
          <h2>アバターとの関係性</h2>
          <Radio
            options={options1}
            selectedOption={selectedOption1}
            onOptionChange={handleOptionChange1}
          />
        </div>
        <div className="course">
          <h2>コース内容</h2>
          <Radio
            options={options2}
            selectedOption={selectedOption2}
            onOptionChange={handleOptionChange2}
          />
        </div>
      </div >
      <div className="next_button_parent">
        <Button
          to="/Destination"
          label="next page"
          hiddenButtonId="startHiddenButton"
        />
      </div>
    </>
  );
};

export default Setting;