import Map from "../components/Map";
import Button from "../components/Button";
import ConfirmButton from "../components/ConfirmButton";
import "./css/Destination.css";
import { SwitchDisable } from "../components/SwitchDisable";

const Destination = () => {
  const disable = SwitchDisable().disable;
  const disableStyle = SwitchDisable().disableStyle;
  return (
    <div className="Destination">
      <div className="back_button_parent">
        <Button to="/setting" label="←" />
      </div>
      <div className="map">
        <Map />
      </div>
      <div className="next_button_parent">
        <ConfirmButton to="/Select" label="next page" hiddenButtonId="rootSearchHiddenButton" disable={disable} disableStyle={disableStyle} />
      </div>
    </div>
  );
};

export default Destination;
