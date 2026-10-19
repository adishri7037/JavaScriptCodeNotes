

console.log("JavaScript Operators, Strings & Numbers — Node.js");

const quantity = "5";
const price = "100";

const total = Number(quantity) * Number(price);

console.log(`Quantity: ${quantity}`);
console.log(`Price: ${price}`);
console.log(`Total: ₹${total}`);

console.log("Strict equality:", 10 === "10");
console.log("parseInt:", parseInt("25px", 10));
console.log("parseFloat:", parseFloat("25.75px"));
console.log("Math random 1-100:", Math.floor(Math.random() * 100) + 1);
