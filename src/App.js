import { Component } from "react";
import "./App.css";
import TransactionTable from "./components/transaction/TransactionTable.js";

class App extends Component {
  constructor(props) {
    super();
    this.state = { transactions: [] };
  }
  handleSave() {}
  componentDidMount() {
    this.setState(() => ({
      transactions: this.props.transactions,
    }));
  }
  render() {
    console.log(`App rendering with transactions: ${this.props.transactions}`);
    return (
      <div className="app">
        <div className="topBar">
          {/* Will become top bar component */}
          <h1 className="mainHeader">Money Man</h1>
          <div className="menu">
            <button onClick={this.props.handleNew}>New</button>
            <button onClick={this.props.handleOpen}>Open</button>
            <button onClick={this.handleSave}>Save</button>
          </div>
        </div>
        <div className="container">
          <div className="box"></div> {/* Will become Stats component */}
          <div className="box2"></div> {/* Will become a vis component */}
          <div className="box3"></div> {/* Will become another vis component */}
          <TransactionTable transactions={this.props.transactions} />
        </div>
      </div>
    );
  }
}

export default App;
