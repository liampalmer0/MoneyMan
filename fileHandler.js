const jetpack = require("fs-jetpack");

function prepareData(transactions) {
  // do something
  return { transactions: transactions };
}

function save(transactions, savePath) {
  let data = prepareData(transactions);
  jetpack.write(savePath, data, { atomic: true, jsonIndent: 2 });
}
function load(loadPath) {
  const data = jetpack.read(loadPath, "json");
  return data.transactions ? data.transactions : [];
}

module.exports = {
  save,
  load,
};
