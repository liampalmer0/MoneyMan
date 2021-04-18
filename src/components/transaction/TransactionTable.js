import React from "react";
import "./Transaction.css";
import TransactionRow from "./TransactionRow.js";

export default class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowId: -1,
    };
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  onClickEdit(e, data) {
    this.props.handleClickEdit(e, data);
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
            onClickEdit={this.onClickEdit}
            onClickDelete={this.props.handleClickDelete}
          />
        );
      });
    }

    return (
      <div className="transactionTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}
