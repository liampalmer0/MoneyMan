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
      selected: [],
    };
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.onAddRow = this.onAddRow.bind(this);
    this.onUpdateRow = this.onUpdateRow.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
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
  handleCheckChange(e, data) {
    // TODO: selected to state.selected list
    console.log(data);
  }

  onAddRow(transaction) {
    this.setState(() => ({ addIsOpen: false }));
    this.props.onAddRow(...transaction);
  }
  onUpdateRow(e, transaction) {
    e.preventDefault();
    this.setState(() => ({ editIsOpen: false }));
    this.props.onUpdateRow(...transaction);
  }
  onDeleteRow(e, transaction) {
    e.preventDefault();
    this.setState(() => ({ deleteIsOpen: false }));
    this.props.onUpdateRow(...transaction);
  }

  render() {
    return (
      <div className="tContainer">
        <div className="tableControls">
          <h2>Transactions</h2>
          <div className="rowControls">
            <button
              title="Edit"
              onClick={this.onClickEdit}
              disabled={this.state.selected.length === 0}
            >
              <span className="fas fa-pen"></span>
            </button>
            <button
              title="Delete"
              onClick={this.props.onClickDelete}
              disabled={this.state.selected.length === 0}
            >
              <span className="fas fa-trash-alt"></span>
            </button>
          </div>
          <button onClick={this.handleClickAdd}>
            <span className="fas fa-plus"></span>
          </button>
        </div>
        <TransactionTable
          transactions={this.props.transactions}
          onCheckChange={this.handleCheckChange}
        ></TransactionTable>
        {this.state.addIsOpen && (
          <AddDialog
            name="addDialog"
            onClose={this.handleClickAdd}
            onAction={this.onAddRow}
            isOpen={this.state.addIsOpen}
          ></AddDialog>
        )}
        {this.state.deleteIsOpen && (
          <DeleteDialog
            name="DeleteDialog"
            onClose={this.handleClickDelete}
            onAction={this.onDeleteRow}
          ></DeleteDialog>
        )}
        {this.state.editIsOpen && (
          <EditDialog
            name="EditDialog"
            onClose={this.handleClickEdit}
            onAction={this.onUpdateRow}
            transaction={this.state.currentTransaction}
          ></EditDialog>
        )}
      </div>
    );
  }
}
