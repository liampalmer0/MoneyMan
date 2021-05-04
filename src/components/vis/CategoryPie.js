import { Component } from "react";
import { ResponsiveContainer, PieChart, Pie, LabelList, Cell } from "recharts";

const COLORS = [
  "#e96655",
  "#f3722c",
  "#f8961e",
  "#f9844a",
  "#f9c74f",
  "#90be6d",
  "#43aa8b",
  "#4d908e",
  "#577590",
  "#277da1",
  "#2A9D8F",
];
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
            innerRadius="50%"
            outerRadius="75%"
            paddingAngle={1}
            labelLine={false}
          >
            <LabelList dataKey="name" position="outside" stroke="#292E21" />
            {this.props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
