import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { Avatar } from "./Unity/Unity";
import "./index.css";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div id="main-container">
        <div id="content-container">
          <App />
          <Avatar />
        </div>
        <footer>
          <span style={{ margin: "15px 15px 15px 15px" }}>
            <a href="https://developer.yahoo.co.jp/sitemap/">
              Webサービス by Yahoo! JAPAN
            </a>
          </span>
        </footer>
      </div>
    </Provider>
  </React.StrictMode>
);
