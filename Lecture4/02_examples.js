// Conditionals & Decision Logic — runnable examples
console.log("=== if / else if / else ===");

const marks = 82;

if (marks >= 90) {
  console.log("A+");
} else if (marks >= 80) {
  console.log("A");
} else if (marks >= 70) {
  console.log("B");
} else if (marks >= 40) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log("\n=== switch ===");

const operation = "add";
const a = 10;
const b = 5;

switch (operation) {
  case "add":
    console.log(a + b);
    break;
  case "subtract":
    console.log(a - b);
    break;
  case "multiply":
    console.log(a * b);
    break;
  case "divide":
    console.log(a / b);
    break;
  default:
    console.log("Unknown operation");
}

console.log("\n=== ternary ===");

const age = 19;
const access = age >= 18 ? "Allowed" : "Denied";
console.log(access);

console.log("\n=== nested decision ===");

const isLoggedIn = true;
const isAdmin = false;

if (isLoggedIn) {
  if (isAdmin) {
    console.log("Admin dashboard");
  } else {
    console.log("User dashboard");
  }
} else {
  console.log("Login required");
}

console.log("\n=== guard clause ===");

function withdraw(balance, amount) {
  if (amount <= 0) return "Invalid amount";
  if (amount > balance) return "Insufficient balance";
  return `Remaining balance: ${balance - amount}`;
}

console.log(withdraw(5000, 1200));

console.log("\n=== correct range ===");

const score = 75;

if (score >= 40 && score <= 100) {
  console.log("Valid passing score");
} else {
  console.log("Invalid or failing score");
}

console.log("\n=== strict equality ===");

console.log(5 == "5");   // true due to coercion
console.log(5 === "5");  // false: different types
