import { Component } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  ResponsiveContainer,
} from "recharts";

export default class LineGraph extends Component {
  render() {
    if (this.props.data.length > 0) {
      return (
        <ResponsiveContainer width="93%" height="90%">
          <LineChart
            data={this.props.data}
            margin={{ top: 5, bottom: 10, right: 5, left: 5 }}
          >
            <Line type="monotone" dataKey="value" stroke="#F78E69" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      return <div>No transaction data</div>;
    }
  }
}
