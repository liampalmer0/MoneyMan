import { Component } from "react";
import TransactionTable from "./TransactionTable.js";

export default class Transactions extends Component {
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
    return (
      <div className="table-container">
        <div className="table-controls">
          <h2>Transactions</h2>
          <div className="row-controls">
            <button
              className="btn-edit"
              title="Edit"
              onClick={this.props.onClickEdit}
              disabled={this.props.checkedCount !== 1}
            >
              <span className="fas fa-pen"></span>
            </button>
            <button
              className="btn-delete"
              title="Delete"
              onClick={this.props.onClickDelete}
              disabled={this.props.checkedCount < 1 && !this.props.allChecked}
            >
              <span className="fas fa-trash-alt"></span>
            </button>
          </div>
          <button onClick={this.props.onClickAdd}>
            <span className="fas fa-plus"></span>
          </button>
        </div>
        <TransactionTable
          transactions={this.props.transactions}
          onCheckChange={this.onCheckChange}
          allChecked={this.props.allChecked}
          onCheckAll={this.onCheckAll}
        ></TransactionTable>
      </div>
    );
  }
}
