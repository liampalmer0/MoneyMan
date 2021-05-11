import React from "react";
import Dialog from "./Dialog.js";

class DeleteDialog extends React.Component {
  render() {
    return (
      <Dialog
        onAction={this.props.onAction}
        onClose={this.props.onClose}
        name="Delete Transaction(s)"
      >
        <span>
          Are you sure you want to delete the selected transaction(s)?
        </span>
        <div className="controls">
          <input type="submit" value="Delete"></input>
        </div>
      </Dialog>
    );
  }
}

export default DeleteDialog;
