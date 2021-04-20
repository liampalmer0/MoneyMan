import { Component } from "react";
import "./App.css";
import AppMenu from "./components/AppMenu";
import Transactions from "./components/transaction/Transactions.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
    this.addTransaction = this.addTransaction.bind(this);
    this.onLoadRes = this.handleLoadResponse.bind(this);
  }
  handleLoadResponse(data) {
    console.log(`Got "${data}" from main process`);
    this.setState(() => ({ transactions: [...data] }));
  }
  handleSaveResponse(data) {
    console.log(JSON.stringify(data));
  }

  handleNew() {
    window.api.send("new", "create new please");
  }
  handleLoad() {
    window.api.send("load", "load please");
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
  updateTransaction(name, cat, amount) {
    //TODO: find and update transaction in state.transactions
    console.log(`Updating transaction '${name}'`);
  }
  deleteTransaction(name, cat, amount) {
    //TODO: find and update transaction in state.transactions
    console.log(`Updating transaction ${name}`);
  }
  componentDidMount() {
    // set up IPC event listeners
    window.api.receive("load", (data) => {
      this.handleLoadResponse(data);
    });
    window.api.receive("save", (data) => {
      this.handleSaveResponse(data);
    });
  }
  render() {
    return (
      <div className="app">
        <AppMenu
          onClickNew={this.handleNew}
          onCickOpen={this.handleLoad}
          onClickSave={this.handleSave}
        ></AppMenu>
        <div className="container">
          <div className="box"></div> {/* Will become Stats component */}
          <div className="box2"></div> {/* Will become a vis component */}
          <div className="box3"></div> {/* Will become another vis component */}
          <Transactions
            onAddRow={this.addTransaction}
            onUpdateRow={this.updateTransaction}
            onDeleteRow={this.deleteTransaction}
            transactions={this.state.transactions}
          />
        </div>
      </div>
    );
  }
}

export default App;
