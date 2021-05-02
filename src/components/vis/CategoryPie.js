import { Component } from "react";
import { ResponsiveContainer, PieChart, Pie, LabelList } from "recharts";

export default class CategoryPie extends Component {
  render() {
    return (
      <ResponsiveContainer width="90%" height="90%">
        <PieChart>
          <Pie
            data={this.props.data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#82ca9d"
            labelLine={false}
          >
            <LabelList dataKey="name" position="outside" stroke="none" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
