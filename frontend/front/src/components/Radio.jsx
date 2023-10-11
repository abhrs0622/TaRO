import React from "react";

const Radio = ({ options, selectedOption, onOptionChange }) => {
  return (
    <div>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={onOptionChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Radio;

//使用例
// import React, { useState } from "react";
// import Radio from "../components/Radio";

// const options = [
//   { value: "option1", label: "Option 1" },
//   { value: "option2", label: "Option 2" },
//   { value: "option3", label: "Option 3" },
// ];

// const Destination = () => {
//   const [selectedOption, setSelectedOption] = useState(options[0].value);

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div className="Destination">
//       <Radio
//         options={options}
//         selectedOption={selectedOption}
//         onOptionChange={handleOptionChange}
//       />
//       <p>Selected option: {selectedOption}</p>
//     </div>
//   );
// };

// export default Destination;
