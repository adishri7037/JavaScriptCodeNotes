
// 1. Calculator
let a = 25;
let b = 4;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);


// 2. Marks
let m1 = 80, m2 = 75, m3 = 90, m4 = 85, m5 = 70;
let total = m1 + m2 + m3 + m4 + m5;
let average = total / 5;

console.log(`Total = ${total}`);
console.log(`Average = ${average}`);


// 3. Strict equality
console.log(10 == "10");   // true
console.log(10 === "10");  // false


// 4. Login
let username = "admin";
let password = "1234";

if (username === "admin" && password === "1234") {
  console.log("Login successful");
} else {
  console.log("Invalid credentials");
}


// 5. String methods
let name = "  JavaScript Student  ";
let cleanName = name.trim();

console.log(cleanName);
console.log(cleanName.toUpperCase());
console.log(cleanName.toLowerCase());
console.log(cleanName.length);


// 6. String extraction
console.log(cleanName.slice(0, 5));


// 7. Number conversion
let amount = Number("250");
console.log(amount, typeof amount);


// 8. Invalid number
let value = Number("hello");
console.log(value);
console.log(Number.isNaN(value));


// 9. Random number 1–100
let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);


// 10. Student result
let student = "  Neha Sharma  ";
let subject1 = 88;
let subject2 = 92;
let subject3 = 85;

let marksTotal = subject1 + subject2 + subject3;
let percentage = marksTotal / 3;

console.log(
  `Student: ${student.trim().toUpperCase()} | ` +
  `Total: ${marksTotal} | ` +
  `Percentage: ${percentage.toFixed(2)}%`
);
