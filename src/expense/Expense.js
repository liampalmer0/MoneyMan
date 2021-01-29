import { Component } from "react";
import { Input } from "../input";
import "./Expense.css";

class Expense extends Component {
  render() {
    return (
      <div className="expense">
        <Input type="text" placeholder="name" />
        <Input type="number" placeholder="amount" />
        <span>&times;</span>
      </div>
    );
  }
}
export default Expense;