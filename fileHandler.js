const jetpack = require("fs-jetpack");

function prepareData(transactions) {
  // do something
  return { transactions: transactions };
}

function save(transactions, savePath) {
  let data = prepareData(transactions);
  jetpack.write(savePath, data, { atomic: true, jsonIndent: 2 });
}
function load(savePath = "./saves/default.json") {
  console.log(`reading ${savePath}`);
  const data = jetpack.read(savePath, "json");
  console.log(data);
  return data.transactions;
}

module.exports = {
  save,
  load,
};
