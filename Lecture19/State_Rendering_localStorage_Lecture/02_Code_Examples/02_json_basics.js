const expense = {
  title: "Internet",
  amount: 799
};

// JavaScript object -> JSON string
const json = JSON.stringify(expense);
console.log(json);

// JSON string -> JavaScript object
const restoredExpense = JSON.parse(json);
console.log(restoredExpense.title);
