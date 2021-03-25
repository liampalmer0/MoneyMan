import React from "react";
import Dialog from "./Dialog.js";

class Add extends React.Component {
  render() {
    return (
      <Dialog
        isOpen={this.props.isOpen}
        handleAction={this.props.handleAction}
        handleClose={this.props.handleClose}
      >
        <span>Add Transaction</span>
        <input type="text" name="name" placeholder="Transaction Name" />
        <input type="text" name="category" placeholder="Transaction Category" />
        <input type="number" name="amount" placeholder="0.00" />
        <div className="controls">
          <button onClick={this.props.handleClose}>Cancel</button>
          <input type="submit" name="Save" value="Save" />
        </div>
      </Dialog>
    );
  }
}

export default Add;
