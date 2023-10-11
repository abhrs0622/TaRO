import React, { useState } from "react";
//import { useNavigate } from "react-router-dom"
import Map from "../components/Map";
import RadioRe from "../components/Radio_relationship";
import Radio from "../components/Radio";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const Destination = () => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="Destination">
      <Radio
        options={options}
        selectedOption={selectedOption}
        onOptionChange={handleOptionChange}
      />
      <p>Selected option: {selectedOption}</p>
      <Map />
      <RadioRe />
    </div>
  );
};

export default Destination;
