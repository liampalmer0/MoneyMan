import React from "react";
import Dialog from "./Dialog";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cat: "",
      amount: "",
      date: "",
    };
    this.onAction = this.onAction.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onCatChange = this.onCatChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
  }
  onAction(e) {
    e.preventDefault();
    this.props.onAction([
      this.state.date,
      this.state.name,
      this.state.cat,
      this.state.amount,
    ]);
  }
  onDateChange(e) {
    this.setState(() => ({
      date: e.target.value,
    }));
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
        onAction={this.onAction}
        onClose={this.props.onClose}
        name="Add Transaction"
      >
        <input
          type="date"
          name="date"
          value={this.state.date}
          onChange={this.onDateChange}
          autoFocus
          required
        />
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.onNameChange}
          placeholder="Name"
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
          step="0.01"
          required
        />
        <div className="controls">
          <button type="button" onClick={this.props.onClose}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </Dialog>
    );
  }
}

export default Add;
