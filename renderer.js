// let myNotification = new Notification('Title', {
//     body: 'Lorem Ipsum Dolor Sit Amet'
//   })
  
//   myNotification.onclick = () => {
//     console.log('Notification clicked')
//   }

class Expense {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

const currency = new Intl.NumberFormat('en-US',
{ style: 'currency', currency: 'USD',
minimumFractionDigits: 2 });
const weeksInMonth = 4.35;
const weeksInYear = 52;

var $ = require("jquery");
var expenses = [];

$(document).ready( () => {
  console.log("Ready")
});
$("#btnAdd").click(() => {addExpense()});
$("#btnCalc").click(() => {calcAndDisplay()});
$("#scopeChoice").change(() => {switchScope()});

function calcAndDisplay() {
  //set gross weekly val to (rate*hours) * (100-tax)/100
  let afterTax = ((100 - $("#tax").val()) / 100);

  let grossWk = ($("#rate").val() * $("#hours").val());
  if(isNaN(grossWk))
    grossWk = 0;
  let grossWkAfTax = grossWk * afterTax;
  
  let grossMonth = grossWk * weeksInMonth;
  let grossMonthAftTax = grossMonth * afterTax;
  
  let grossYear = grossWk * weeksInYear; 
  let grossYearAftTax = grossYear * afterTax;
  
  $("#grossWk").html(currency.format(grossWk));
  $("#grossWkAT").html(currency.format(grossWkAfTax));

  $("#grossMn").html(currency.format(grossMonth));
  $("#grossMnAT").html(currency.format(grossMonthAftTax));

  $("#grossYr").html(currency.format(grossYear));
  $("#grossYrAT").html(currency.format(grossYearAftTax));
}
function switchScope() { 
  let target = $("#outputGrid");
  var show = $("#scopeChoice").prop("selectedIndex");
  $(target).children().addClass("hide");
  switch (show) {
    case 0:
      $(".outputWk").removeClass("hide");
      break;
    case 1:
      $(".outputMn").removeClass("hide");
      break;
    case 2:
      $(".outputYr").removeClass("hide");
      break;
    default:
      $(target).children().removeClass("hide");
      break;
  }
}

function sumExpenses() {
  let expSum = 0
  expenses.forEach((expense) => {
    expSum += expense.amount;
    console.log(expense);
  })
  
  return expSum;
}

function addExpense() {
  console.log("@ addExpense()")
  expenses.push(new Expense("Gasoline", "500"));
  sumExpenses();
}

function rmSelectedExpenses() {

}

function save() {
  console.log("not done");
}

