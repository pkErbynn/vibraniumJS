// This file demonstrate refactoring of old way js to modern 
// Runs from Option A, B, ... mapping to Basic/Good, Pro/Better, Legend/Best

const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

const getLimit = user => spendingLimits?.[user] ?? 0;

const addExpense = function (value, description, user = 'jonas') {
  // if (!user) user = 'jonas';  // setting default user param...done in param ()
  user = user.toLowerCase();

  ///// Option A
  // var limit;
  // if (spendingLimits[user]) {
  //   limit = spendingLimits[user];
  // } else {
  //   limit = 0;
  // }

  ///// Option B...tenary
  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  //// Option C...nullish colesing + optional chain
  // const limit = spendingLimits?.[user] ?? 0;

  //// Opt D...DRY..outsourced fxn..arrow functions for straight forward functions 
  const limit = getLimit(user);

  if (value <= limit) {
    //// Opt A
    // budget.push({ value: -value, description: description, user: user });

    //// Opt B...Enhanced obj literal
    budget.push({ value: -value, description, user });
  }
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpenses = function () {
  for (const entry of budget) {

    //// Option A
    // let limit;
    // if (spendingLimits[entry.user]) {
    //   limit = spendingLimits[entry.user];
    // } else {
    //   limit = 0;
    // }

    // if (entry.value < -getLimit(user)) {
    //   entry.flag = 'limit';
    // }

    //// Opt C
    // const limit = spendingLimits?.[entry.user] ?? 0;

    // if (entry.value < -limit) {
    //   entry.flag = 'limit';
    // }

    /// Opt D...with method
    if (entry.value < -getLimit(entry.user)) {
      entry.flag = 'limit';
    }
  }
};
checkExpenses();

console.log(budget);

const logBigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget) {

    //// Opt A...if with no else
    // if (entry.value <= -bigLimit) {
    //   //// Opt A...contination with '+'
    //   // output += entry.description.slice(-2) + ' / '; // Emojis are 2 chars

    //   //// Opt B....string interpolation
    //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
    // }

    /// Opt B...ternary
    output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
    }

    output = output.slice(0, -2); // Remove last '/ '
    console.log(output);
  }



logBigExpenses(100);


///////////////////////////////////////////////////////////////
/////////////////////// USING PURE FUNTIONS ///////////////////





