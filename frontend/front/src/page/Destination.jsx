import Map from "../components/Map";
import Button from "../components/Button";
import ConfirmButton from "../components/ConfirmButton";
import "./css/Destination.css";
import { SwitchDisable } from "../components/SwitchDisable";

const Destination = () => {
  let disable = SwitchDisable().disable;
  let disableStyle = SwitchDisable().disableStyle;
  const perfEntries = performance.getEntriesByType("navigation");

  perfEntries.forEach(function (pe) {
    /** 読み込みタイプを取得 */
    const type = pe.type;
    if (type == "reload" || type == "back_forward") {
      disable = false;
      disableStyle = { opacity: 1 }
    }
  });
  return (
    <div className="Destination">
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
