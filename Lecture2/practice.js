
console.log("Q1:", typeof null);

console.log("Q2:", typeof NaN);

console.log("Q3:", Boolean("0"));

console.log("Q4:", Boolean(0));

console.log("Q5:", Boolean([]));

console.log("Q6:", Boolean({}));

console.log("Q7:", "10" + 5);

console.log("Q8:", "10" - 5);

console.log("Q9:", 5 == "5");

console.log("Q10:", 5 === "5");

// Extra practice
let value = "25";
console.log("Q11:", typeof value);
console.log("Q12:", typeof Number(value));

let username = "";
if (username) {
  console.log("Q13: Username entered");
} else {
  console.log("Q13: Please enter username");
}
