import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";

let T = [];

function requestData() {
  window.api.send("load", "some data");
}
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App transactions={T} handleOpen={requestData} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

window.api.receive("load", (data) => {
  console.log(`Got "${data}" from main process`);
  T = [...data];
  render();
});
window.api.receive("save", (data) => {
  console.log(`${data}`);
});
window.api.send("save", "some data");

render();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
