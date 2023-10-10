import './App.css';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
  } from "react-router-dom";

import Home from "./page/Home"
import  Set_op  from "./page/Setting_op.js";
import  Set  from "./page/setting.js";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Setting_option" element={<Set_op />} />
          <Route path="/Setting" element={<Set />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
