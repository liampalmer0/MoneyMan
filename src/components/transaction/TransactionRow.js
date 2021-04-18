import React from "react";
import "./Transaction.css";

export default class TransactionRow extends React.Component {
  constructor(props) {
    super(props);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  onClickEdit(e) {
    this.props.onClickEdit(e, this.props.transaction);
  }

  render() {
    const transaction = this.props.transaction;
    return (
      <tr>
        <td>{transaction.name}</td>
        <td>{transaction.category}</td>
        <td>{transaction.amount}</td>
        <td>
          <div className="rowControls">
            <button name="Edit" onClick={this.onClickEdit}>
              Edit
            </button>
            <button name="Delete" onClick={this.props.onClickDelete}>
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  }
}
