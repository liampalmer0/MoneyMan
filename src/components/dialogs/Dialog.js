import React from "react";
import "./Dialog.css";

class Dialog extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="dialog">
          <div className="header">
            <span>{this.props.name}</span>
            <button onClick={this.props.onClose}>
              <span className="fas fa-times"></span>
            </button>
          </div>
          <form onSubmit={this.props.onAction}>{this.props.children}</form>
        </div>
      </div>
    );
  }
}

export default Dialog;
