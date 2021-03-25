import React from "react";
import "./Transaction.css";
import DeleteDialog from "../dialog/Delete.js";
import AddDialog from "../dialog/Add.js";
import EditDialog from "../dialog/Edit.js";

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
    this.state = {
      editIsOpen: false,
      deleteIsOpen: false,
      addIsOpen: false,
      rowData: {},
      rowId: -1,
    };
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
            onClickEdit={this.props.handleClickEdit}
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

class AllTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editIsOpen: false,
      deleteIsOpen: false,
      addIsOpen: false,
      rowCount: 0,
    };
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }
  handleClickEdit(e, data) {
    this.setState((state) => ({
      editIsOpen: !state.editIsOpen,
      deleteIsOpen: false,
      addIsOpen: false,
      data: data,
    }));
  }
  handleClickDelete(e) {
    this.setState((state) => ({
      deleteIsOpen: !state.deleteIsOpen,
      editIsOpen: false,
      addIsOpen: false,
    }));
  }
  handleClickAdd() {
    this.setState((state) => ({
      addIsOpen: !state.addIsOpen,
      editIsOpen: false,
      deleteIsOpen: false,
    }));
  }
  updateRow(e, data) {
    e.preventDefault();
    console.log("Update row clicked");
    this.setState((state) => ({
      editIsOpen: !state.editIsOpen,
      // state.data = data;
      // state.rowId = e.target.id;
    }));
  }
  deleteRow(e, rowId) {
    e.preventDefault();
    console.log(e);
    console.log("Delete row clicked");
    this.setState((state) => ({
      deleteIsOpen: !state.deleteIsOpen,
      editIsOpen: false,
      addIsOpen: false,
    }));
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
          handleClickEdit={this.handleClickEdit}
          handleClickDelete={this.handleClickDelete}
        ></TransactionTable>
        <AddDialog
          name="addDialog"
          handleClose={this.handleClickAdd}
          handleAction={this.props.addTransaction}
          isOpen={this.state.addIsOpen}
        ></AddDialog>
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

export default AllTransactions;
