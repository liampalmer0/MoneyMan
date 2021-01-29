import React from "react";
import "./Transaction.css";
import DeleteDialog from "../dialog/DeleteDialog.js";
import EditDialog from "../dialog/EditDialog.js";

class TransactionRow extends React.Component {
  render() {
    const transaction = this.props.transaction;
    return (
      <tr>
        <td>{transaction.name}</td>
        <td>{transaction.category}</td>
        <td>{transaction.amount}</td>
        <td>
          <div className="rowControls">
            <button name="Edit" onClick={this.props.onClickEdit}>
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

class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditRow = this.handleEditRow.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.state = {
      editIsOpen: false,
      deleteIsOpen: false,
      rowData: {},
      rowId: -1,
    };
  }

  handleClickEdit(e, data) {
    this.setState((state) => ({
      editIsOpen: !state.editIsOpen,
      deleteIsOpen: false,
      data: data,
    }));
  }
  handleClickDelete(e) {
    this.setState((state) => ({
      deleteIsOpen: !state.deleteIsOpen,
      editIsOpen: false,
    }));
  }
  handleEditRow(e, data) {
    this.setState((state) => {
      state.editIsOpen = !state.editIsOpen;
      state.data = data;
      state.rowId = e.target.id;
    });
  }
  handleDeleteRow(e, rowId) {
    this.setState((state) => {
      state.editIsOpen = !state.editIsOpen;
      state.rowId = e.target.id;
    });
  }
  render() {
    const rows = [];
    this.props.transactions.forEach((transaction) => {
      rows.push(
        <TransactionRow
          transaction={transaction}
          key={transaction.id}
          onClickEdit={this.handleClickEdit}
          onClickDelete={this.handleClickDelete}
        />
      );
    });

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
        <DeleteDialog
          name="DeleteDialog"
          handleClose={this.handleClickDelete}
          handleAction={this.deleteRow}
          isOpen={this.state.deleteIsOpen}
        ></DeleteDialog>
        <EditDialog
          name="EditDialog"
          handleClose={this.handleClickEdit}
          handleAction={this.updateRow}
          isOpen={this.state.editIsOpen}
        ></EditDialog>
      </div>
    );
  }
}

class AllTransactions extends React.Component {
  render() {
    return (
      <div className="tContainer">
        <div className="tableControls">
          <h2>Transactions</h2>
          <button>Add</button>
        </div>
        <TransactionTable
          transactions={this.props.transactions}
        ></TransactionTable>
      </div>
    );
  }
}

export default AllTransactions;
