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
      </div>
      <footer>
        <div>
          <span style={{ margin: "15px 15px 15px 15px" }}>
            &copy; 2023 Team TaRO
          </span>
          <span style={{ margin: "15px 15px 15px 15px" }}>
            <a href="https://github.com/abhrs0622/TaRO">
              GitHub
            </a>
          </span>
        </div>
        <div>
          <span style={{ margin: "15px 15px 15px 15px" }}>
            <a href="https://developer.yahoo.co.jp/sitemap/">
              Web Services by Yahoo! JAPAN
            </a>
          </span>
          <span style={{ margin: "15px 15px 15px 15px" }}>
            <a href="https://tsumugi-official.studio.site/top">
              VOICEVOX:春日部つむぎ
            </a>
          </span>
        </div>
      </footer>
    </Provider>
  </React.StrictMode>
);
