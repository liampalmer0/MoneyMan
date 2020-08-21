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
    expSum += parseFloat(expense.amt);
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
  $("#grossWkAT").html(currency.format(grossWkAftTax));
  $("#netWk").html(currency.format(netWk));

  $("#grossMn").html(currency.format(grossMonth));
  $("#grossMnAT").html(currency.format(grossMonthAftTax));
  $("#netMn").html(currency.format(netMn));

  $("#grossYr").html(currency.format(grossYear));
  $("#grossYrAT").html(currency.format(grossYearAftTax));
  $("#netYr").html(currency.format(netYr));

  //i think needed for start up to show the right saved state
  $("#scopeChoice").trigger("change");
}

function switchScope(e) {
  //could change this selector to a relative one for code reuse
  let allScopes = $("#outputGrid");
  let show = $(e.target).val();
  allScopes.children().addClass("hide");
  if (show !== "all") {
    $(".output" + show).removeClass("hide");
    $(show.toString().toLowerCase() + "Label").removeClass("hide");
    console.log("showing " + show.toString().toLowerCase() + "Label");
    // .third only exists for wider viewports; adjusts height of single output block
    $(".output" + show).addClass("third");
  } else {
    $(allScopes).children().removeClass("hide");
    $(allScopes).children().removeClass("third");
  }
}
function switchDets(e) {
  //could change this selector to a relative one for code reuse
  let allScopes = $("#outputGrid");
  // let show = $(e.target).val(); // gr, grAT, or net
  let show = getIntRepresentationOfSelection();
  // getDetailsVal() {
  //    $(".scopeDetailChoice").val()
  //      for each add to return val
  //      return single digit represenation
  //
  //  like 1 gross, 2 grAT, 4 net
  //  3 gr + grAT
  //  5 gross + net
  //  6 grAT + net
  //  7 all
  //  would be simpler to store in save file
  //  could also convert the scope selection to a number
  //  and have a 2 digit represetation
  //    Ex: Gross and Net, for yearly = 52
  // }
  allScopes.find("label").addClass("hide");
  if (show !== "all") {
    // $(".output" + show).removeClass("hide");
    // $(show.toString().toLowerCase() + "Label").removeClass("hide");
    // console.log("showing " + show.toString().toLowerCase() + "Label");
  } else {
    // $(allScopes).children().removeClass("hide");
    // $(allScopes).children().removeClass("third");
  }
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
  let rowId = target.name.slice(0, target.name.indexOf("-"));
  let type = target.name.slice(target.name.indexOf("-") + 1);
  let r = expenses.find(({ id }) => id === rowId);
  r[type] = r.id === rowId ? value : r.name;
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
  jetpack.write(savePath, data, { atomic: true, jsonIndent: 2 });
}
function open() {
  let data = jetpack.read(savePath, "json");
  load(data);
  calcAndDisplay();
}

function createPie() {
  var colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "aqua",
    "purple",
    "pink",
    "black",
    "brown",
  ];
  var data = [1, 1, 2, 3, 5, 8, 13, 21];
  var arcs = d3.pie()(data);
  // console.log(arcs);
  // arcs has start and end angle for arc() function -- see below
  arcs.forEach((a) => {
    var arc = d3
      .arc()
      .innerRadius(130)
      .outerRadius(200)
      .startAngle(a.startAngle)
      .endAngle(a.endAngle);
    let pathv = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathv.setAttribute("d", arc());
    pathv.setAttribute("fill", colors[a.index]);
    document.querySelector("#pieChart").appendChild(pathv);
    // console.log(arc()); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
    
    //add hover and info for percents, categories etc

    //also maybe switch to a different chart as pi is potentially hard to read.
    //100% bar chart, lollipop chart, treemap etc.
  });
}
//=== START ====================================================================
$().ready(() => {
  open();
  createPie();
});
$("#btnSave").click(() => {
  save();
});
$("#btnAdd").click(() => {
  addEmptyExpense();
});
$("#btnCalc").click(() => {
  calcAndDisplay();
});
$("#scopeChoice").change((e) => {
  switchScope(e);
});
$("#outputDets")
  .children("input")
  .change((e) => {
    switchDets(e);
  });
$(".btnRm").click((e) => {
  rmExpense(e);
});
$(".expenseField").change((e) => {
  updateExpData(e);
});
