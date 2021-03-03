import React from "react";
import "./Dialog.css";

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onAction = this.onAction.bind(this);
  }
  onClose(e) {
    this.props.handleClose();
  }
  onAction(e) {
    this.props.handleAction();
  }
  render() {
    const isOpen = this.props.isOpen;
    if (isOpen) {
      return (
        <div className="wrapper">
          <div className="dialog">
            <div className="header">
              <span>{this.props.name}</span>
              <button onClick={this.onClose}>&times;</button>
            </div>
            <form>{this.props.children}</form>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Dialog;
