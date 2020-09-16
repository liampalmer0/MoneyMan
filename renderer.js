const $ = require("jquery");
const jetpack = require("fs-jetpack");
const d3 = require("d3-shape");
const savePath = "./saves/default.json";
const DAYS_IN_YEAR = 365.25;
const MONTHS_IN_YEAR = 12;
const DAYS_IN_WEEK = 7;
const WEEKS_IN_YR = DAYS_IN_YEAR / DAYS_IN_WEEK;
const WEEKS_IN_MN = WEEKS_IN_YR / MONTHS_IN_YEAR;
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
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
  let expSum = 0;
  expenses.forEach((expense) => {
    if (expense.amt && !isNaN(expense.amt)) expSum += parseFloat(expense.amt);
  });
  return expSum;
}

function calcAndDisplay() {
  let inverseTax = (100 - $("#tax").val()) / 100;
  let mnExpenses = sumExpenses();
  let grossWk = $("#rate").val() * $("#hours").val();
  grossWk = isNaN(grossWk) ? 0 : grossWk;
  let grossWkAftTax = grossWk * inverseTax;
  let netWk = grossWkAftTax - mnExpenses / WEEKS_IN_MN;

  let grossMonth = grossWk * WEEKS_IN_MN;
  let grossMonthAftTax = grossMonth * inverseTax;
  let netMn = grossMonthAftTax - mnExpenses;

  let grossYear = grossWk * WEEKS_IN_YR;
  let grossYearAftTax = grossYear * inverseTax;
  let netYr = grossYearAftTax - mnExpenses * MONTHS_IN_YEAR;

  $("#grossWk").html(currency.format(grossWk));
  $("#grossATWk").html(currency.format(grossWkAftTax));
  $("#netWk").html(currency.format(netWk));

  $("#grossMn").html(currency.format(grossMonth));
  $("#grossATMn").html(currency.format(grossMonthAftTax));
  $("#netMn").html(currency.format(netMn));

  $("#grossYr").html(currency.format(grossYear));
  $("#grossATYr").html(currency.format(grossYearAftTax));
  $("#netYr").html(currency.format(netYr));

  //Triggers output style adjustments
  $("#scopeChoice").trigger("change");
}

function switchScope(e) {
  let allScopes = $("#outputGrid");
  let show = $(e.target).val();
  allScopes.children().addClass("hide");
  if (show !== "all") {
    $(".output" + show).removeClass("hide");
    $(show.toString().toLowerCase() + "Label").removeClass("hide");
    // .third only exists for wider viewports; adjusts height of single output block
    $(".output" + show).addClass("third");
  } else {
    $(allScopes).children().removeClass("hide");
    $(allScopes).children().removeClass("third");
  }
}
function switchDetails(e) {
  let tval = $(e.target).val();
  let details = { 1: "lblGross", 2: "lblGrAT", 4: "lblNet" };
  if ($(e.target).prop("checked")) {
    $("label[class*='" + details[tval] + "']").removeClass("hide");
  } else {
    $("label[class*='" + details[tval] + "']").addClass("hide");
  }
}

function getDetailsVal() {
  let checked = $("#detailChoices")
    .find("input:checked")
    .map(function () {
      return $(this).val();
    })
    .toArray();
  return checked.length > 0
    ? checked.reduce(
        (accumulator, currentValue) =>
          parseInt(accumulator) + parseInt(currentValue)
      )
    : 0;
}

function setDetailsVal(val) {
  let one = $("#detailChoices").find("input[value='1']");
  let two = $("#detailChoices").find("input[value='2']");
  let four = $("#detailChoices").find("input[value='4']");

  switch (parseInt(val)) {
    case 1:
      // set 1
      one.prop("checked", true);
      two.prop("checked", false);
      four.prop("checked", false);
      break;
    case 2:
      //set 2
      one.prop("checked", false);
      two.prop("checked", true);
      four.prop("checked", false);
      break;
    case 3:
      //set 1 and 2
      one.prop("checked", true);
      two.prop("checked", true);
      four.prop("checked", false);
      break;
    case 4:
      //set 4
      one.prop("checked", false);
      two.prop("checked", false);
      four.prop("checked", true);
      break;
    case 5:
      //set 4 and 1
      one.prop("checked", true);
      two.prop("checked", false);
      four.prop("checked", true);
      break;
    case 6:
      //set 2 and 4
      one.prop("checked", false);
      two.prop("checked", true);
      four.prop("checked", true);
      break;
    case 7:
      //set all
      one.prop("checked", true);
      two.prop("checked", true);
      four.prop("checked", true);
      break;
    case 0:
    default:
      //set none
      one.prop("checked", false);
      two.prop("checked", false);
      four.prop("checked", false);
      break;
  }
  one.trigger("change");
  two.trigger("change");
  four.trigger("change");
}

//=== EXPENSE LIST =============================================================
function addEmptyExpense() {
  let rowId = "row" + expIndex;
  let insertPoint = $("#expenseList");

  //expenseItem
  let expenseItem = $("<div></div>", {
    class: "expenseItem",
  });

  //name input
  $("<input/>", {
    class: "expenseField",
    type: "text",
    name: rowId + "-name",
    placeholder: "name",
    on: {
      change: (e) => {
        updateExpData(e);
      },
    },
  }).appendTo(expenseItem);

  //amount input
  $("<input/>", {
    class: "expenseField",
    type: "number",
    name: rowId + "-amt",
    placeholder: "amount",
    on: {
      change: (e) => {
        updateExpData(e);
      },
    },
  }).appendTo(expenseItem);

  //remove img
  let ximg = $("<img/>", {
    src: "content/img/font-awesome-icons/times-solid.svg",
    on: {
      click: (e) => {
        rmExpense(e);
      },
    },
  });

  //remove button
  $("<button></button>", {
    class: "imgBtn btnRm",
    name: rowId,
    html: ximg,
  }).appendTo(expenseItem);

  insertPoint.append(expenseItem);
  expIndex++;
  expenses.push(new Expense(rowId, "", "0"));
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
  let rowId = target.name.slice(0, target.name.indexOf("-")); //gets "row"X
  let type = target.name.slice(target.name.indexOf("-") + 1); // gets "name" or "amt"
  let match = expenses.find(({ id }) => id === rowId);
  match[type] = value;
}

function rmExpense(event) {
  $(event.target).closest(".expenseItem").remove();
  let index = expenses.findIndex(
    ({ id }) => id === event.target.parentNode.name
  );
  expenses.splice(index, 1);
}

//=== FILE SYSTEM ==============================================================
function load(data) {
  if (data === undefined || JSON.stringify(data) === "{}") {
    addEmptyExpense();
  } else {
    $("#rate").val(data.hourlyRate);
    $("#hours").val(data.hours);
    $("#tax").val(data.tax);
    $("#scopeChoice").val(data.scope);
    setDetailsVal(data.details);

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
  data.details = getDetailsVal();
  return data;
}
function save() {
  let data = prepareData();
  jetpack.write(savePath, data, { atomic: true, jsonIndent: 2 });
}
function open() {
  let data = jetpack.read(savePath, "json");
  load(data);
  calcAndDisplay();
}

//=== START ====================================================================
$("#btnSave").on("click", () => {
  save();
});
$("#btnAdd").on("click", () => {
  addEmptyExpense();
});
$("#btnCalc").on("click", () => {
  calcAndDisplay();
});
$("#scopeChoice").on("change", (e) => {
  switchScope(e);
});
$("#detailChoices")
  .find("input")
  .on("change", (e) => {
    switchDetails(e);
  });
$(".btnRm").on("click", (e) => {
  rmExpense(e);
});
$(".expenseField").on("change", (e) => {
  updateExpData(e);
});
//open and setup once ready
$(() => {
  open();
});
