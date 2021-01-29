import { Component } from "react";
import "./Input.css";

class Label extends Component {
  render() {
    return (
      <label className="textLabel" htmlFor={this.props.for}>
        {this.props.title}
      </label>
    );
  }
}

export default Label;
