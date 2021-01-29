import React from "react";
import Dialog from "./Dialog.js";

class EditDialog extends React.Component {
  render() {
    return (
      <Dialog
        isOpen={this.props.isOpen}
        handleAction={this.props.handleAction}
        handleClose={this.props.handleClose}
      >
        <input type="text" name="name" placeholder="Transaction Name" />
        <input type="text" name="category" placeholder="Transaction Category" />
        <input type="number" name="amount" placeholder="0.00" />
        <div className="controls">
          <button>Cancel</button>
          <input type="submit" name="Save" value="Save" />
        </div>
      </Dialog>
    );
  }
}

export default EditDialog;
