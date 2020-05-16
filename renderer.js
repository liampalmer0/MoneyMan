// let myNotification = new Notification('Title', {
//     body: 'Lorem Ipsum Dolor Sit Amet'
//   })
  
//   myNotification.onclick = () => {
//     console.log('Notification clicked')
//   }

class Expense {
  constructor(expid, name, amount) {
    this.expid = expid;
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
var expenseIndex = 0;

$(document).ready( () => {
  console.log("Ready")
});
$("#btnAdd").click(() => {addExpense()});
$("#btnAdd").click(() => {rmSelectedExpenses()});
$("#btnCalc").click(() => {calcAndDisplay()});
$("#scopeChoice").change(() => {switchScope()});
$(".btnRemove").click((e) => {
  //this target is an img inside of a btn
  console.log("target is:" + e.target.parentNode.name);
  rmExpense(e);
})
$(".expenseField").change((event) => {
  //this target is a text input
  console.log("target is:" + event.target.name);
  updateExpData(event);
})
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
  console.log("@ sumExpenses()")
  let expSum = 0
  expenses.forEach((expense) => {
    expSum += expense.amount;
    console.log(expense);
  })
  
  return expSum;
}

function addExpense() {
  console.log("@ addExpense()")
  //determine id (first 3 letter of name + index)
  // at this point it will be unk0
  //create div.expenseItem
  //create input:text.expenseField name=id+"-name" placeholder="name"
  //create input:number.expenseField name=id+"-amount" placeholder="amount"
  //create btn name=id
  //expenses.push(new Expense("unk0","unknown", "0"));
  //sumExpenses();
}

function updateExpData(event) {
  //get target name from event
  //parse out the ID
  
  //if name field
  //  
  //else
  //  
  //if target dne in expenseList
  //
  //  expenses.push(new)
}

function rmSelectedExpenses() {
  console.log("@ rmSelectedExpenses()")
}
function rmExpense(event) {
  console.log("@ rmExpense()")
}
function save() {
  console.log("@ save()")
  console.log("not done");
  //if there are expenses w/out names -> dont include
  //if w/out amounts -> use 0
}


