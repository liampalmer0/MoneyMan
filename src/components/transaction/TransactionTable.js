import React from "react";
import "./Transaction.css";
import TransactionRow from "./TransactionRow.js";

export default class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowId: -1,
    };
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  onCheckChange(e, data) {
    this.props.onCheckChange(e, data);
  }

  render() {
    const rows = [];
    // assign key as prop as id from data here
    // inside of row, access the key prop to tell higher functions what to edit/delete
    // datalist -> react row -> event -> handle/update -> rerender changed data
    if (this.props.transactions.length !== 0) {
      this.props.transactions.forEach((transaction) => {
        rows.push(
          <TransactionRow
            transaction={transaction}
            key={transaction.id}
            onCheckChange={this.onCheckChange}
          />
        );
      });
    }

    return (
      <div className="transactionTable">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" disabled={this.props.transactions.length === 0} />
              </th>
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
