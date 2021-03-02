import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import TransactionTable from "./transaction/TransactionTable.js";
import reportWebVitals from "./reportWebVitals";

const T = [
  { id: 1, amount: 60.42, name: "Kroger", category: "food" },
  { id: 2, amount: 40.21, name: "Jewel Osco", category: "food" },
  { id: 3, amount: 11.0, name: "Downtown Parking", category: "misc" },
  { id: 4, amount: 15.73, name: "Speedway", category: "gas" },
];

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <div className="topBar">
      {/* Will become top bar component */}
      <h1 className="mainHeader">Money Man</h1>
      <div className="menu">
        <button>New</button>
        <button>Open</button>
        <button>Save</button>
      </div>
    </div>
    <div className="container">
      <div className="box"></div> {/* Will become income component */}
      <div className="box2"></div> {/* Will become spending vis component */}
      <div className="box3"></div> {/* Will become category vis component */}
      <TransactionTable transactions={T} />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

window.api.receive("fromMain", (data) => {
  console.log(`Got "${data}" from main process`);
});
window.api.send("toMain", "some data");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
