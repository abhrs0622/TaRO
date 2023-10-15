import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Avatar } from "./Unity/Unity";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Avatar />
  </React.StrictMode>
);
