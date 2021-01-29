// collapsable section component idk
import { Component } from "react";
import "./Layout.css";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    // this.expand = this.expand.bind(this);
  }
  expand() {
    this.setState((state) => ({
      visible: !state.visible,
    }));
  }
  render() {
    return (
      <section className={this.props.class}>
        <button className="section-title" onClick={this.expand.bind(this)}>
          {this.props.title} &darr;
        </button>
        <div
          className={"content" + (this.state.visible ? " expand" : "")}
        >
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default Section;
