import React from "react";
import "./Transaction.css";

export default class TransactionRow extends React.Component {
  constructor(props) {
    super(props);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  onCheckChange(e) {
    this.props.onCheckChange(e, this.props.transaction);
  }

  render() {
    const transaction = this.props.transaction;
    return (
      <tr>
        <td>
          <input type="checkbox" onChange={this.onCheckChange} />
        </td>
        <td>{transaction.name}</td>
        <td>{transaction.category}</td>
        <td>{transaction.amount}</td>
      </tr>
    );
  }
}
