const calcCatsAndSums = (transactions) => {
  let incSum = 0;
  let expSum = 0;
  let expCats = new Map();
  let incCats = new Map();
  let dateSums = new Map();
  transactions.forEach((t) => {
    if (!dateSums.has(t.date)) {
      dateSums.set(t.date, {
        name: t.date,
        date: new Date(t.date),
        value: parseFloat(t.amount),
      });
    } else {
      dateSums.set(t.date, {
        name: t.date,
        date: new Date(t.date),
        value: dateSums.get(t.date).value + parseFloat(t.amount),
      });
    }
    let amount = parseFloat(t.amount);
    // if an income item
    if (amount > 0) {
      incSum += amount;
      if (incCats.has(t.category)) {
        incCats.set(t.category, {
          name: t.category,
          value: incCats.get(t.category).value + amount,
        });
      } else {
        incCats.set(t.category, {
          name: t.category,
          value: amount,
        });
      }
    } else {
      // if an expense item
      expSum -= amount;
      if (expCats.has(t.category)) {
        expCats.set(t.category, {
          name: t.category,
          value: expCats.get(t.category).value + amount * -1,
        });
      } else {
        expCats.set(t.category, {
          name: t.category,
          value: amount * -1,
        });
      }
    }
  });
  return {
    expenses: Array.from(expCats.values()),
    income: Array.from(incCats.values()),
    incomeSum: incSum,
    expenseSum: expSum * -1,
    dateSums: Array.from(dateSums.values()).sort((a, b) => a.date - b.date),
  };
};

const calcPcSpent = (inc, exp) => {
  if (inc === 0 && exp !== 0) return 100;
  else if (inc === 0 && exp === 0) return 0;
  else return Math.round(((exp * -1) / inc) * 10000) / 100;
};

export { calcCatsAndSums, calcPcSpent };
