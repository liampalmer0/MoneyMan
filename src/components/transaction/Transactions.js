import { Component } from "react";
import TransactionTable from "./TransactionTable.js";
import AddDialog from "../dialog/Add.js";
import EditDialog from "../dialog/Edit.js";
import DeleteDialog from "../dialog/Delete.js";

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editIsOpen: false,
      deleteIsOpen: false,
      addIsOpen: false,
      rowCount: 0,
      currentTransaction: {},
    };
    this.handleAddTransaction = this.handleAddTransaction.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }
  handleClickEdit(e, data) {
    e.preventDefault();
    this.setState((state) => ({
      editIsOpen: !state.editIsOpen,
      deleteIsOpen: false,
      addIsOpen: false,
      currentTransaction: data,
    }));
  }
  handleClickDelete(e) {
    e.preventDefault();
    this.setState((state) => ({
      deleteIsOpen: !state.deleteIsOpen,
      editIsOpen: false,
      addIsOpen: false,
    }));
  }
  handleClickAdd(e) {
    e.preventDefault();
    this.setState((state) => ({
      addIsOpen: !state.addIsOpen,
      editIsOpen: false,
      deleteIsOpen: false,
    }));
  }
  handleAddTransaction(transaction) {
    this.setState(() => ({ addIsOpen: false }));
    this.props.addTransaction(...transaction);
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
        {this.state.addIsOpen && (
          <AddDialog
            name="addDialog"
            handleClose={this.handleClickAdd}
            handleAction={this.handleAddTransaction}
            isOpen={this.state.addIsOpen}
          ></AddDialog>
        )}
        {this.state.deleteIsOpen && (
          <DeleteDialog
            name="DeleteDialog"
            handleClose={this.handleClickDelete}
            handleAction={this.deleteRow}
          ></DeleteDialog>
        )}
        {this.state.editIsOpen && (
          <EditDialog
            name="EditDialog"
            handleClose={this.handleClickEdit}
            handleAction={this.updateRow}
            transaction={this.state.currentTransaction}
          ></EditDialog>
        )}
      </div>
    );
  }
}
