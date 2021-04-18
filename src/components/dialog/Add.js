import React from "react";
import Dialog from "./Dialog.js";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cat: "",
      amount: "",
    };
    this.onAction = this.onAction.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCatChange = this.onCatChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
  }
  onAction(e) {
    e.preventDefault();
    this.props.handleAction([
      this.state.name,
      this.state.cat,
      this.state.amount,
    ]);
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
        isOpen={this.props.isOpen}
        handleAction={this.onAction}
        handleClose={this.props.handleClose}
      >
        <span>Add Transaction</span>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.onNameChange}
          placeholder="Name"
          autoFocus
          required
        />
        <input
          type="text"
          name="category"
          value={this.state.cat}
          onChange={this.onCatChange}
          placeholder="Category"
          required
        />
        <input
          type="number"
          name="amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
          placeholder="0.00"
          required
        />
        <div className="controls">
          <button onClick={this.props.handleClose}>Cancel</button>
          <input type="submit" value="Save" />
        </div>
      </Dialog>
    );
  }
}

export default Add;
