import { Component } from "react";
import { moneyFmt } from "../../utils/formats";

export default class Stats extends Component {
  render() {
    return (
      <div className="stats">
        <div className="overview">
          <p>
            Income: <span>{moneyFmt.format(this.props.income)}</span>
          </p>
          <p>
            Expenses: <span>{moneyFmt.format(this.props.expenses)}</span>
          </p>
        </div>
        <div className="percent-spent">
          <span>Income Spent: </span>
          <span>{this.props.spent}%</span>
        </div>
      </div>
    );
  }
}
