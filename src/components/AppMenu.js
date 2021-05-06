import { Component } from "react";
import "./AppMenu.css";

export default class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClickOff = this.handleClickOff.bind(this);
    this.state = {
      drawerVisible: false,
    };
  }
  toggleDrawer(e) {
    this.setState((state) => ({
      drawerVisible: !state.drawerVisible,
    }));
  }
  handleClickOff(e) {
    if (e.target.className === "drawer-wrapper") {
      this.toggleDrawer(e);
    }
  }
  render() {
    return (
      <div className="appMenu">
        <div className="bar">
          <button onClick={this.toggleDrawer}>
            <span className="burger fas fa-bars"></span>
          </button>
          <h1 className="mainHeader">
            Money Man{" "}
            {this.props.filename ? `- ${this.props.filename.slice(0, 25)}` : ""}
            {this.props.unsaved ? "*" : ""}
          </h1>
        </div>
        {this.state.drawerVisible && (
          <div className="drawer-wrapper" onClick={this.handleClickOff}>
            <div className="drawer">
              <div className="menu">
                <button onClick={this.props.onClickNew} title="New file">
                  <span className="fas fa-file"></span>
                </button>
                <button onClick={this.props.onCickOpen} title="Open">
                  <span className="fas fa-folder-open"></span>
                </button>
                <button onClick={this.props.onClickSave} title="Save">
                  <span className="fas fa-save"></span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
