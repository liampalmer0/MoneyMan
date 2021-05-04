import { Component } from "react";
import "./App.css";
import AppMenu from "./components/AppMenu";
import Transactions from "./components/transaction/Transactions.js";
import CategoryPie from "./components/vis/CategoryPie";
import LineGraph from "./components/vis/LineGraph";
import Stats from "./components/vis/Stats";
import { calcPcSpent, calcCatsAndSums } from "./utils/calculator";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      allChecked: false,
      checkCt: 0,
      categoryData: [],
      percentSpent: 0,
      sums: { income: 0, expenses: 0 },
      historyData: [],
    };
    this.addTransaction = this.addTransaction.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.updateVis = this.updateVis.bind(this);
  }
  updateVis() {
    const data = calcCatsAndSums(this.state.transactions);
    this.setState(() => ({
      categoryData: data.expenses,
      percentSpent: calcPcSpent(data.incomeSum, data.expenseSum),
      sums: { income: data.incomeSum, expenses: data.expenseSum },
      historyData: data.dateSums,
    }));
  }

  handleLoadResponse(data) {
    console.log(`Got "${data}" from main process`);
    this.setState(
      () => ({ transactions: [...data] }),
      () => {
        this.updateVis();
      }
    );
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

  addTransaction(date, name, cat, amount) {
    this.setState(
      (state) => ({
        transactions: [
          ...state.transactions,
          {
            id: state.transactions.length + 1,
            amount: amount,
            name: name,
            date: date,
            category: cat,
            checked: false,
          },
        ],
      }),
      () => this.updateVis()
    );
  }
  updateTransaction(transaction) {
    this.setState(
      (state) => {
        let transactions = state.transactions;
        transactions[
          transactions.findIndex((t) => t.id === transaction.id)
        ] = transaction;
        return { transactions: transactions };
      },
      () => this.updateVis()
    );
  }
  deleteTransaction(e) {
    if (this.state.allChecked) {
      this.setState(
        () => ({
          transactions: [],
          allChecked: false,
          checkCt: 0,
        }),
        () => this.updateVis()
      );
    } else {
      this.setState(
        (state) => {
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
        },
        () => this.updateVis()
      );
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
          <div className="box stats">
            <h2>Overview</h2>
            <Stats
              spent={this.state.percentSpent}
              income={this.state.sums.income}
              expenses={this.state.sums.expenses}
            ></Stats>
          </div>
          <div className="box categories">
            <h2>Categories</h2>
            <CategoryPie data={this.state.categoryData}></CategoryPie>
          </div>
          <div className="box history">
            <h2>History</h2>
            <LineGraph data={this.state.historyData}></LineGraph>
          </div>
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
