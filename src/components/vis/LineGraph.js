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
    return (
      <ResponsiveContainer width="95%" height="90%">
        <LineChart width={400} height={400} data={this.props.data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
