import { Component } from "react";
import { moneyFmt } from "../../utils/formats";
import "./vis.css";

export default class Stats extends Component {
  render() {
    return (
      <div>
        <div className="overview">
          <p>
            Income: <span>{moneyFmt.format(this.props.income)}</span>
          </p>
          <p>
            Expenses: <span>{moneyFmt.format(this.props.expenses)}</span>
          </p>
          <p>
            Income Spent: <span>{this.props.spent}%</span>
          </p>
        </div>
      </div>
    );
  }
}
