import Map from "../components/Map";
import Button from "../components/Button";
import ConfirmButton from "../components/ConfirmButton";
import "./css/Destination.css";

const Destination = () => {
  return (
    <div className="Destination">
      <div className="back_button_parent">
        <Button to="/setting" label="←" />
      </div>
      <div className="map">
        <Map />
      </div>
      <div className="next_button_parent">
        <ConfirmButton to="/Select" label="next page" hiddenButtonId="rootSearchHiddenButton" />
      </div>
    </div>
  );
};

export default Destination;
