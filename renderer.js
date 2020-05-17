// let myNotification = new Notification('Notify', {
//     body: 'Lorem Ipsum Dolor Sit Amet'
//   })
  
//   myNotification.onclick = () => {
//     console.log('Notification clicked')
//   }

const $ = require("jquery");
const jetpack = require('fs-jetpack');
const savePath = "./saves/default.json";
const DAYS_IN_YEAR = 365.25;
const MONTHS_IN_YEAR = 12;
const DAYS_IN_WEEK = 7;
const WEEKS_IN_YR = DAYS_IN_YEAR/DAYS_IN_WEEK;
const WEEKS_IN_MN = WEEKS_IN_YR/MONTHS_IN_YEAR;
const currency = new Intl.NumberFormat('en-US',{
  style: 'currency', 
  currency: 'USD',
  minimumFractionDigits: 2 
});

var expenses = [];
var expIndex = 0;

class Expense {
  constructor(id, name, amt) {
    this.id = id;
    this.name = name;
    this.amt = amt;
  }
}

function sumExpenses() {
  let expSum = 0
  expenses.forEach((expense) => {
    expSum += parseFloat(expense.amt);
  });
  return expSum;
}

function calcAndDisplay() {
  let inverseTax = ((100 - $("#tax").val()) / 100);  
  let mnExpenses = sumExpenses();
  let grossWk = ($("#rate").val() * $("#hours").val());
  grossWk = (isNaN(grossWk)) ? 0 : grossWk;
  let grossWkAftTax = (grossWk * inverseTax);
  let netWk = grossWkAftTax - (mnExpenses/WEEKS_IN_MN);
  
  let grossMonth = grossWk * WEEKS_IN_MN;
  let grossMonthAftTax = (grossMonth * inverseTax);
  let netMn = grossMonthAftTax - mnExpenses;
  
  let grossYear = grossWk * WEEKS_IN_YR; 
  let grossYearAftTax = grossYear * inverseTax;
  let netYr = grossYearAftTax - (mnExpenses * MONTHS_IN_YEAR)
  
  $("#grossWk").html(currency.format(grossWk));
  $("#grossWkAT").html(currency.format(grossWkAftTax));
  $("#netWk").html(currency.format(netWk));
  
  $("#grossMn").html(currency.format(grossMonth));
  $("#grossMnAT").html(currency.format(grossMonthAftTax));
  $("#netMn").html(currency.format(netMn));
  
  $("#grossYr").html(currency.format(grossYear));
  $("#grossYrAT").html(currency.format(grossYearAftTax));
  $("#netYr").html(currency.format(netYr));

  $("#scopeChoice").trigger("change");
}

function switchScope(e) { 
  //should change this selector to a relative one for code reuse
  let allScopes = $("#outputGrid");
  let show = $(e.target).val();
  allScopes.children().addClass("hide");
  if(show !== "all") {
    $(".output" + show).removeClass("hide");
  } 
  else {
    $(allScopes).children().removeClass("hide");
  }
}
      
function addEmptyExpense() {
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
  return rowId;
}

function addExpense(name, amt) {
  let rowId = addEmptyExpense();
  $("input[name='" + rowId + "-name'").val(name);
  $("input[name='" + rowId + "-amt'").val(amt);
  let expense = expenses.find(({ id }) => id === rowId);
  expense.name = name;
  expense.amt = amt;
}
        
function updateExpData(event) {
  let target = event.target;
  let value = $(target).val();
  let rowId = target.name.slice(0,4);
  let type = target.name.slice(5);
  let r = expenses.find(({ id }) => id === rowId);
  r[type] = (r.id === rowId) ? value : r.name;
}

function rmExpense(event) {
  $(event.target).closest(".expenseItem").remove();
  let index = expenses.findIndex(({ id }) => 
    id === event.target.parentNode.name);
  expenses.splice(index, 1);
}

function load(data) {
  if(data === undefined || 
    JSON.stringify(data) === "{}"){
    addEmptyExpense();
  }
  else {
    $("#rate").val(data.hourlyRate);
    $("#hours").val(data.hours);
    $("#tax").val(data.tax);
    $("#scopeChoice").val(data.scope);
    data.expenses.forEach((exp) => {
      addExpense(exp.name, exp.amt);
    });
  }
}

function prepareData() {
  let data = {};
  data.hourlyRate = $("#rate").val();
  data.hours = $("#hours").val();
  data.tax = $("#tax").val();
  data.expenses = expenses;
  data.scope = $("#scopeChoice").val();
  return data;
}
function save() {
  let data = prepareData();
  jetpack.write(savePath, data, {"atomic": true, "jsonIndent": 2});
}
function open() {
  let data = jetpack.read(savePath, "json");
  load(data);
  calcAndDisplay();
}

$().ready(() => {
  open();
  // console.log(expenses);
});
$("#btnSave").click(() => { save()});
$("#btnAdd").click(() => { addEmptyExpense() });
$("#btnCalc").click(() => { calcAndDisplay() });
$("#scopeChoice").change((e) => { switchScope(e) });
$(".btnRm").click((e) => { rmExpense(e) });
$(".expenseField").change((e) => { updateExpData(e) });
// $(window).resize(() => {
//   if(window.innerWidth < 888 && !broke) {
//     broke = true;
//     $("#breakpoint").removeClass("splitCol");
//     console.log("broke");
//   }
//   else {
//     broke = false;
//     $("#breakpoint").addClass("splitCol");
//   }
// });