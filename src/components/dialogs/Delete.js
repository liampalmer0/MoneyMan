import { PureComponent } from "react";
import Dialog from "./Dialog.js";

export default class DeleteDialog extends PureComponent {
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
