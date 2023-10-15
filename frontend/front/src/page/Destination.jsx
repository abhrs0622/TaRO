import Map from "../components/Map";
import Button from "../components/Button";
import ConfirmButton from "../components/ConfirmButton";

const Destination = () => {
  return (
    <div className="Destination">
      <Button to="/setting" label="back page" />
      <Map />
      <ConfirmButton to="/Select" label="next page" />
    </div>
  );
};

export default Destination;
