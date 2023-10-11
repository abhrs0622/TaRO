import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./page/Home";
import Set_op from "./page/Setting_op.jsx";
import Set from "./page/setting.jsx";
import Destination from "./page/Destination.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Setting_option" element={<Set_op />} />
          <Route path="/Setting" element={<Set />} />
          <Route path="/Destination" element={<Destination />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
