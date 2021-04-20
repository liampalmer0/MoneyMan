import { Component } from "react";
import "./AppMenu.css";

export default class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.state = {
      drawerVisible: false,
    };
  }
  toggleDrawer(e) {
    this.setState((state) => ({
      drawerVisible: !state.drawerVisible,
    }));
  }
  render() {
    return (
      <div className="appMenu">
        <div className="bar">
          <span
            className="burger fas fa-bars"
            onClick={this.toggleDrawer}
          ></span>
          <h1 className="mainHeader">Money Man</h1>
        </div>
        {this.state.drawerVisible && (
          <div className="drawer">
            <div className="menu">
              <button onClick={this.props.onClickNew}>
                <span className="fas fa-plus"></span>New
              </button>
              <button onClick={this.props.onCickOpen}>
                <span className="fas fa-folder-open"></span>Open
              </button>
              <button onClick={this.props.onClickSave}>
                <span className="fas fa-save"></span>Save
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
