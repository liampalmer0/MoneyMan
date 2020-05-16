// let myNotification = new Notification('Title', {
//     body: 'Lorem Ipsum Dolor Sit Amet'
//   })
  
//   myNotification.onclick = () => {
//     console.log('Notification clicked')
//   }

class Expense {
  constructor(id, name, amount) {
    this.id = id;
    this.name = name;
    this.amt = amount;
  }
}

const currency = new Intl.NumberFormat('en-US',
{ style: 'currency', currency: 'USD',
minimumFractionDigits: 2 });
const weeksInMonth = 4.35;
const weeksInYear = 52;

var $ = require("jquery");
var expenses = [];
var expIndex = 0;


function calcAndDisplay() {
  let inverseTax = ((100 - $("#tax").val()) / 100);  
  
  let grossWk = ($("#rate").val() * $("#hours").val());
  if(isNaN(grossWk))
  grossWk = 0;
  let grossWkAfTax = grossWk * inverseTax;
  
  let grossMonth = grossWk * weeksInMonth;
  let grossMonthAftTax = grossMonth * inverseTax;
  
  let grossYear = grossWk * weeksInYear; 
  let grossYearAftTax = grossYear * inverseTax;
  
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
  });
  return expSum;
}
        
function addExpense() {
  console.log("@ addExpense()")
  let rowId = "row" + expIndex;
  let insertPoint = $("#expenseList");
  
  //expenseItem
  let expenseItem = $("<div></div>", {
    "class": "expenseItem",
  });
  
  //name input
  $("<input/>", {
    "class": "expenseField",
    type: "text",
    name: rowId + "-name",
    placeholder: "name",
    on: {change: (e) => {updateExpData(e)}}
  }).appendTo(expenseItem);
  
  //amount input
  $("<input/>", {
    "class": "expenseField",
    type: "number",
    name: rowId + "-amt",
    placeholder: "amount",
    on: {change: (e) => {updateExpData(e)}}
  }).appendTo(expenseItem);
  
  //remove img
  let ximg = $("<img/>", {
    src: "content/img/font-awesome-icons/times-solid.svg",
    on: {click: (e) => {rmExpense(e)}}
  });

  //remove button
  $("<button></button>", {
    "class": "imgBtn btnRm",
    name: rowId,
    html: ximg
  }).appendTo(expenseItem);
  
  insertPoint.append(expenseItem);
  expIndex++;
  expenses.push(new Expense(rowId,"unknown", "0"));
  //sumExpenses();
}
        
function updateExpData(event) {
  console.log("@ updateExpData()");
  let target = event.target;
  let value = $(target).val();
  let rowId = target.name.slice(0,4);
  let type = target.name.slice(5);
  console.log("RowId : " + rowId);
  console.log("Type : " + type);
  console.log("Value : " + value);

  if(type === "name" || type === "amt") {
    let r = expenses.find(({ id }) => id === rowId);
    r[type] = (r.id === rowId) ? value : r.name; 
  }
  else {
    console.log("Error: target type not recognized");
  }
  console.log(expenses);
}

function rmExpense(event) {
  console.log("@ rmExpense()");
  $(event.target).closest(".expenseItem").remove();
  let index = expenses.findIndex(({ id }) => id === event.target.name);
  expenses.splice(index, 1);
  console.log("removed : " + event.target.parentNode.name);
}
function save() {
  console.log("@ save()")
  console.log("not done");
  //if there are expenses w/out names -> dont include
  //if w/out amounts -> use 0
}

$("#btnAdd").click(() => { addExpense() });
$("#btnCalc").click(() => { calcAndDisplay() });
$("#scopeChoice").change(() => { switchScope() });
$(".btnRm").click((e) => { rmExpense(e) });
$(".expenseField").change((e) => { updateExpData(e) });
        
        
        