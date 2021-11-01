import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import InternState from "./context/interns/InternState";
import LeaveState from "./context/leaves/LeaveState";
import LoadingState from "./context/loading/LoadingState";
import AlertState from "./context/alerts/AlertState";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <LoadingState>
      <InternState>
        <LeaveState>
          <AlertState>
            <App />
          </AlertState>
        </LeaveState>
      </InternState>
    </LoadingState>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
