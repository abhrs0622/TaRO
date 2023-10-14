import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./page/Home";
import SetOp from "./page/Setting_op.jsx";
import Set from "./page/setting.jsx";
import Destination from "./page/Destination.jsx";
import SelectPlan from "./page/Select_plan.jsx";
import DirectionRec from "./page/Route_rec.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Setting_option" element={<SetOp />} />
          <Route path="/Setting" element={<Set />} />
          <Route path="/Destination" element={<Destination />} />
          <Route path="/Select" element={<SelectPlan />} />
          <Route path="/Rec" element={<DirectionRec />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
