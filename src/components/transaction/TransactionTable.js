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
  render() {
    const rows = [];
    // assign key as prop as id from data here
    // inside of row, access the key prop to tell higher functions what to edit/delete
    // datalist -> react row -> event -> handle/update -> rerender changed data

    // lifting up state
    //  handleExample goes as prop in render & function in class
    //  onExample goes as prop passed to component & used in function
    if (this.props.transactions.length !== 0) {
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
        <DeleteDialog
          name="DeleteDialog"
          handleClose={this.handleClickDelete}
          handleAction={this.props.deleteRow}
          isOpen={this.state.deleteIsOpen}
        ></DeleteDialog>
        <EditDialog
          name="EditDialog"
          handleClose={this.handleClickEdit}
          handleAction={this.props.updateRow}
          isOpen={this.state.editIsOpen}
        ></EditDialog>
      </div>
    );
  }
}

class AllTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowCount: 0,
    };
    this.updateRow = this.updateRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }
  handleClickAdd() {
    console.log("hi");
  }
  updateRow(e, data) {
    this.setState((state) => {
      state.editIsOpen = !state.editIsOpen;
      state.data = data;
      state.rowId = e.target.id;
    });
  }
  deleteRow(e, rowId) {
    this.setState((state) => {
      state.editIsOpen = !state.editIsOpen;
      state.rowId = e.target.id;
    });
  }
  render() {
    return (
      <div className="tContainer">
        <div className="tableControls">
          <h2>Transactions</h2>
          <button onClick={this.handleClickAdd}>Add</button>
        </div>
        <TransactionTable
          transactions={this.props.transactions}
          updateRow={this.updateRow}
          deleteRow={this.deleteRow}
        ></TransactionTable>
      </div>
    );
  }
}

export default AllTransactions;
