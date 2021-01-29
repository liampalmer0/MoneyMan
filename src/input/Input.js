import { Component } from "react";
import "./Input.css";

class Input extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <input
        id={this.props.name}
        type={this.props.type}
        name={this.props.name}
        defaultValue={this.props.value}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default Input;
