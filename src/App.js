import { Component } from "react";
import "./App.css";
import AppMenu from "./components/AppMenu";
import Transactions from "./components/transaction/Transactions.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      allChecked: false,
      checkCt: 0,
    };
    this.addTransaction = this.addTransaction.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSave = this.handleSave.bind(this);
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
  handleCheckAll(e) {
    this.setState((state) => ({
      allChecked: !state.allChecked,
    }));
  }
  handleCheckChange(e, data) {
    this.setState((state) => {
      let transactions = state.transactions;
      let count = state.checkCt;
      let index = transactions.findIndex((t) => t.id === data.id);
      if (state.allChecked && !data.isChecked) {
        count++;
        transactions[index].checked = !data.isChecked;
      } else {
        count = data.isChecked ? count + 1 : count - 1;
        transactions[index].checked = data.isChecked;
      }
      return {
        transactions: transactions,
        checkCt: count,
        allChecked: false,
      };
    });
  }
  addTransaction(name, cat, amount) {
    this.setState((state) => ({
      transactions: [
        ...state.transactions,
        {
          id: state.transactions.length + 1,
          amount: amount,
          name: name,
          category: cat,
          checked: false,
        },
      ],
    }));
  }
  updateTransaction(transaction) {
    this.setState((state) => {
      let transactions = state.transactions;
      transactions[
        transactions.findIndex((t) => t.id === transaction.id)
      ] = transaction;
      return { transactions: transactions };
    });
  }
  deleteTransaction(e) {
    if (this.state.allChecked) {
      this.setState(() => ({
        transactions: [],
        allChecked: false,
        checkCt: 0,
      }));
    } else {
      this.setState((state) => {
        let transactions = [];
        let idCt = 0;
        state.transactions.forEach((t) => {
          if (t.checked === false) {
            t.id = idCt;
            idCt++;
            transactions.push(t);
          }
        });
        return { transactions, checkCt: 0 };
      });
    }
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
            onCheckChange={this.handleCheckChange}
            checkedCount={this.state.checkCt}
            onCheckAll={this.handleCheckAll}
            allChecked={this.state.allChecked}
          />
        </div>
      </div>
    );
  }
}

export default App;
