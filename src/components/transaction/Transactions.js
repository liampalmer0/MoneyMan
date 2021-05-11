import { Component } from "react";
import TransactionTable from "./TransactionTable.js";
import AddDialog from "../dialogs/Add";
import EditDialog from "../dialogs/Edit";
import DeleteDialog from "../dialogs/Delete";

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editIsOpen: false,
      deleteIsOpen: false,
      addIsOpen: false,
      currentTransaction: {},
    };
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.onAddRow = this.onAddRow.bind(this);
    this.onUpdateRow = this.onUpdateRow.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onCheckAll = this.onCheckAll.bind(this);
  }
  handleClickEdit(e) {
    e.preventDefault();
    this.setState((state) => ({
      editIsOpen: !state.editIsOpen,
      deleteIsOpen: false,
      addIsOpen: false,
      currentTransaction:
        this.props.transactions[
          this.props.transactions.findIndex((t) => t.checked === true)
        ],
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
  onCheckChange(e, data) {
    this.props.onCheckChange(e, data);
  }
  onCheckAll(e) {
    this.props.onCheckAll(e);
  }

  onAddRow(transaction) {
    this.setState(() => ({ addIsOpen: false }));
    this.props.onAddRow(...transaction);
  }
  onUpdateRow(e, transaction) {
    e.preventDefault();
    this.setState(() => ({ editIsOpen: false }));
    this.props.onUpdateRow(transaction);
  }
  onDeleteRow(e, transaction) {
    e.preventDefault();
    this.setState(() => ({ deleteIsOpen: false }));
    this.props.onDeleteRow(transaction);
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
              onClick={this.handleClickEdit}
              disabled={this.props.checkedCount !== 1}
            >
              <span className="fas fa-pen"></span>
            </button>
            <button
              className="btn-delete"
              title="Delete"
              onClick={this.handleClickDelete}
              disabled={this.props.checkedCount < 1 && !this.props.allChecked}
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
          onCheckChange={this.onCheckChange}
          allChecked={this.props.allChecked}
          onCheckAll={this.onCheckAll}
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
