import React from "react";
import "./Transaction.css";

export default class TransactionRow extends React.Component {
  constructor(props) {
    super(props);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  onCheckChange(e) {
    this.props.onCheckChange(e, {
      id: this.props.transaction.id,
      isChecked: e.target.checked,
    });
  }

  render() {
    const transaction = this.props.transaction;
    return (
      <tr>
        <td>
          <input
            type="checkbox"
            onChange={this.onCheckChange}
            checked={this.props.checked}
            label={transaction.id}
          />
        </td>
        <td>{transaction.name}</td>
        <td>{transaction.category}</td>
        <td>{transaction.amount}</td>
      </tr>
    );
  }
}
