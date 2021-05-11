import { PureComponent } from "react";
import "./Transaction.css";
import { moneyFmt } from "../../utils/formats";

export default class TransactionRow extends PureComponent {
  constructor(props) {
    super(props);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  onCheckChange(e) {
    this.props.onCheckChange(e, {
      id: this.props.transaction.id,
      isChecked: e.target.checked,
    });
  }

  render() {
    const { transaction } = this.props;
    return (
      <tr>
        <td>
          <input
            type="checkbox"
            onChange={this.onCheckChange}
            checked={this.props.checked}
            label={transaction.id}
          />
        </td>
        <td>{transaction.date}</td>
        <td>{transaction.name}</td>
        <td>{transaction.category}</td>
        <td>{moneyFmt.format(transaction.amount)}</td>
      </tr>
    );
  }
}
