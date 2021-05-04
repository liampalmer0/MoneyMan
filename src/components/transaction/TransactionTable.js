import React from "react";
import "./Transaction.css";
import TransactionRow from "./TransactionRow.js";

export default class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onCheckAll = this.onCheckAll.bind(this);
  }

  onCheckChange(e, data) {
    this.props.onCheckChange(e, data);
  }
  onCheckAll(e) {
    this.props.onCheckAll(e);
  }

  render() {
    const rows = [];
    if (this.props.transactions.length !== 0) {
      this.props.transactions.forEach((transaction) => {
        let isChecked = this.props.allChecked
          ? this.props.allChecked
          : transaction.checked;
        rows.push(
          <TransactionRow
            transaction={transaction}
            key={transaction.id}
            onCheckChange={this.onCheckChange}
            checked={!!isChecked}
          />
        );
      });
    }

    return (
      <div className="transaction-table">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  className="check-all"
                  type="checkbox"
                  disabled={this.props.transactions.length === 0}
                  checked={this.props.allChecked}
                  onChange={this.onCheckAll}
                />
              </th>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}
