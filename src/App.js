import { Component } from "react";
import "./App.css";
import { Input, Label } from "./input";
import Expense from "./expense/Expense";
import Section from "./layout/Section";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="appHead">
          <h1>Money Man</h1>
        </div>
        <div className="appBody">
          <div className="input">
            <Label for="rate" title="Pay Rate" />
            <Input name="rate" type="number" value="0" />
            <Label for="hours" title="Hours" />
            <Input name="hours" type="number" value="0" />
            <Label for="tax" title="Tax Rate (%)" />
            <Input name="tax" type="number" value="0" />
            <div className="controls">
              <button className="controlBtn" id="btnAdd">
                Add Expense
              </button>
              <button className="controlBtn" id="btnCalc">
                Calculate
              </button>
            </div>
            <Section class="refine" title="Refine">
              <div className="outDets">
                <div className="outScope">
                  <Label title="Output Scope" for="scopeChoice" />
                  <select id="scopeChoice" className="textInput select">
                    <option value="Wk">Weekly</option>
                    <option value="Mn">Monthly</option>
                    <option value="Yr">Yearly</option>
                    <option value="all">All</option>
                  </select>
                </div>
                <div className="outGrain">
                  <Label title="Output Details" for="detailChoices" />
                  <div className="trisplitCol" id="detailChoices">
                    <div>
                      <input
                        type="checkbox"
                        value="1"
                        id="gross"
                        name="grossIncome"
                        defaultChecked
                      />
                      <Label title="All Income" for="gross" />
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="2"
                        id="grossAT"
                        name="grossAftTax"
                        defaultChecked
                      />
                      <Label title="Income minus Tax" for="grossAT" />
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        value="4"
                        id="net"
                        name="netIncome"
                        defaultChecked
                      />
                      <Label title="Net Income" for="net" />
                    </div>
                  </div>
                </div>
              </div>
            </Section>
            <Label className="" for="expenseList" title="Monthly Expenses" />
            <div className="expenseList">
              <Expense className="" />
            </div>
          </div>
          <div className="grid-wrapper" id="outputGrid"></div>
        </div>
      </div>
    );
  }
}

export default App;
