import React from "react";
import Dialog from "./Dialog.js";

class DeleteDialog extends React.Component {
  render() {
    return (
      <Dialog
        isOpen={this.props.isOpen}
        handleAction={this.props.handleAction}
        handleClose={this.props.handleClose}
      >
        <span>Delete</span>
        <span>Are you sure you want to delete this transaction?</span>
        <div className="controls">
          <button>Delete</button>
        </div>
      </Dialog>
    );
  }
}

export default DeleteDialog;
