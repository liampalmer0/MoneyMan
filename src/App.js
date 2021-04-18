import { Component } from "react";
import "./App.css";
import Transactions from "./components/transaction/Transactions.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
    this.addTransaction = this.addTransaction.bind(this);
  }
  onLoadRes(data) {
    console.log(`Got "${data}" from main process`);
    this.setState((state) => ({ transactions: [...data] }));
  }
  onSaveRes(data) {
    console.log(JSON.stringify(data));
  }
  handleLoad() {
    window.api.send("load", "sent swag and good tides");
  }
  handleSave() {
    window.api.send("save", "save please");
  }
  addTransaction(name, cat, amount) {
    this.setState((state) => ({
      transactions: [
        ...state.transactions,
        {
          // TODO: handle indexing
          id: 5,
          amount: amount,
          name: name,
          category: cat,
        },
      ],
    }));
  }
  componentDidMount() {
    // set up IPC event listeners
    window.api.receive("load", (data) => {
      this.onLoadRes(data);
    });
    window.api.receive("save", (data) => {
      this.onSaveRes(data);
    });
  }
  render() {
    return (
      <div className="app">
        <div className="topBar">
          {/* Will become top bar component */}
          <h1 className="mainHeader">Money Man</h1>
          <div className="menu">
            <button onClick={this.handleNew}>New</button>
            <button onClick={this.handleLoad}>Open</button>
            <button onClick={this.handleSave}>Save</button>
          </div>
        </div>
        <div className="container">
          <div className="box"></div> {/* Will become Stats component */}
          <div className="box2"></div> {/* Will become a vis component */}
          <div className="box3"></div> {/* Will become another vis component */}
          <Transactions
            addTransaction={this.addTransaction}
            transactions={this.state.transactions}
          />
        </div>
      </div>
    );
  }
}

export default App;
