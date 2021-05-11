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
      date: this.props.transaction.date,
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
    this.props.onAction({
      id: this.props.transaction.id,
      name: this.state.name,
      date: this.state.date,
      category: this.state.cat,
      amount: this.state.amount,
      checked: true,
    });
  }
  onNameChange(e) {
    this.setState(() => ({
      name: e.target.value,
    }));
  }
  onDateChange(e) {
    this.setState(() => ({
      date: e.target.value,
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
        onAction={this.onAction}
        onClose={this.props.onClose}
        name="Edit Transaction"
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
          placeholder="Name"
          value={this.state.name}
          onChange={this.onNameChange}
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

export default EditDialog;
