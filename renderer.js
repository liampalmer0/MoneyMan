// let myNotification = new Notification('Title', {
//     body: 'Lorem Ipsum Dolor Sit Amet'
//   })
  
//   myNotification.onclick = () => {
//     console.log('Notification clicked')
//   }
var $ = require("jquery");
$(document).ready( () => {
  console.log("Ready")
});

const currency = new Intl.NumberFormat('en-US',
  { style: 'currency', currency: 'USD',
    minimumFractionDigits: 2 });
const weeksInMonth = 4.35;
const weeksInYear = 52;

// document.querySelector("#btnCalc").onclick = () => {calcAndDisplay()};
$("#btnCalc").click(() => {calcAndDisplay()});
// document.querySelector("#scopeChoice").onchange = () => {switchScope()};
$("#scopeChoice").change(() => {switchScope()});
function calcAndDisplay() {
  //set gross weekly val to (rate*hours) * (100-tax)/100
  let afterTax = ((100 - document.querySelector("#tax").value) / 100);

  let grossWk = (document.querySelector("#rate").value * document.querySelector("#hours").value);
  if(isNaN(grossWk))
    grossWk = 0;
  let grossWkAfTax = grossWk * afterTax;
  
  let grossMonth = grossWk * weeksInMonth;
  let grossMonthAftTax = grossMonth * afterTax;
  
  let grossYear = grossWk * weeksInYear; 
  let grossYearAftTax = grossYear * afterTax;
  
  document.querySelector("#grossWk").innerHTML = currency.format(grossWk);
  document.querySelector("#grossWkAT").innerHTML = currency.format(grossWkAfTax);

  document.querySelector("#grossMn").innerHTML = currency.format(grossMonth);
  document.querySelector("#grossMnAT").innerHTML = currency.format(grossMonthAftTax);

  document.querySelector("#grossYr").innerHTML = currency.format(grossYear);
  document.querySelector("#grossYrAT").innerHTML = currency.format(grossYearAftTax);
}
function switchScope() { 
  let target = $("#outputGrid");
  console.log("trigger");
  console.log(target);
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
  let expenses = 0;
  return expenses;
}

function addExpense() {

}

function rmSelectedExpenses() {

}

