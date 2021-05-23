import { Component } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  LabelList,
  Cell,
  Tooltip,
} from "recharts";

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
  renderTooltip(external) {
    const data = external.payload[0] ? external.payload[0].payload : "";
    return (
      <span
        style={{
          borderBottom: `${data.fill} solid 2px`,
          backgroundColor: "#fff",
          padding: "0.35rem 0.25rem",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        {data.name}: {Math.round(data.value * 100) / 100}
      </span>
    );
  }
  render() {
    if (this.props.data.length > 0) {
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
            <Tooltip content={this.renderTooltip} />
          </PieChart>
        </ResponsiveContainer>
      );
    } else {
      return <div>No expense data</div>;
    }
  }
}
