import React from "react";
import Dialog from "./Dialog.js";

class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    // seed controlled form values
    this.state = {
      name: this.props.transaction.name,
      cat: this.props.transaction.category,
      amount: this.props.transaction.amount,
    };
    this.onAction = this.onAction.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCatChange = this.onCatChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
  }
  onAction(e) {
    e.preventDefault();
    this.props.handleAction(this.state.name, this.state.cat, this.state.amount);
  }
  onNameChange(e) {
    this.setState(() => ({
      name: e.target.value,
    }));
  }
  onCatChange(e) {
    this.setState(() => ({
      cat: e.target.value,
    }));
  }
  onAmountChange(e) {
    this.setState(() => ({
      amount: e.target.value,
    }));
  }
  render() {
    return (
      <Dialog
        handleAction={this.props.handleAction}
        handleClose={this.props.handleClose}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.onNameChange}
          autoFocus
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={this.state.cat}
          onChange={this.onCatChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="0.00"
          value={this.state.amount}
          onChange={this.onAmountChange}
          required
        />
        <div className="controls">
          <button onClick={this.props.handleClose}>Cancel</button>
          <input type="submit" name="Save" value="Save" />
        </div>
      </Dialog>
    );
  }
}

export default EditDialog;
