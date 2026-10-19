
console.log("===== 1. ARITHMETIC OPERATORS =====");

let a = 20;
let b = 6;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Remainder:", a % b);
console.log("Power:", a ** 2);

let count = 5;
count++;
console.log("After increment:", count);
count--;
console.log("After decrement:", count);


console.log("===== 2. ASSIGNMENT OPERATORS =====");

let x = 10;

x += 5; // x = x + 5
console.log("x += 5:", x);

x -= 3; // x = x - 3
console.log("x -= 3:", x);

x *= 2;
console.log("x *= 2:", x);

x /= 4;
console.log("x /= 4:", x);

x %= 4;
console.log("x %= 4:", x);


console.log("===== 3. COMPARISON OPERATORS =====");

let age = 20;

console.log("age > 18:", age > 18);
console.log("age < 18:", age < 18);
console.log("age >= 20:", age >= 20);
console.log("age <= 19:", age <= 19);


console.log("===== 4. STRICT EQUALITY =====");

console.log('5 == "5":', 5 == "5");     // true: type coercion
console.log('5 === "5":', 5 === "5");   // false: type + value
console.log('5 != "5":', 5 != "5");     // false
console.log('5 !== "5":', 5 !== "5");   // true



console.log("===== 5. LOGICAL OPERATORS =====");

let student = true;
let passedExam = true;

console.log("AND:", student && passedExam);
console.log("OR:", student || false);
console.log("NOT:", !student);

let username = "admin";
let password = "1234";

if (username === "admin" && password === "1234") {
  console.log("Login successful");
}


console.log("===== 6. EXPRESSIONS =====");

let expression1 = 10 + 20;
let expression2 = age >= 18;
let expression3 = student && passedExam;

console.log("Arithmetic expression:", expression1);
console.log("Comparison expression:", expression2);
console.log("Logical expression:", expression3);


console.log("===== 7. OPERATOR PRECEDENCE & GROUPING =====");

console.log("10 + 5 * 2 =", 10 + 5 * 2);       // 20
console.log("(10 + 5) * 2 =", (10 + 5) * 2);   // 30

// Parentheses make the intended grouping explicit.
let result = (20 - 5) * 3 + 2;
console.log("Grouped expression:", result);


console.log("===== 8. TEMPLATE LITERALS =====");

let name = "Rahul";
let marks = 88;

let message = `Student ${name} scored ${marks} marks.`;
console.log(message);

let first = 10;
let second = 20;
console.log(`Sum = ${first + second}`);


console.log("===== 9. COMMON STRING METHODS =====");

let text = "   JavaScript is Powerful   ";

console.log("Original:", text);
console.log("Length:", text.length);
console.log("Trim:", text.trim());
console.log("Uppercase:", text.toUpperCase());
console.log("Lowercase:", text.toLowerCase());

let cleanText = text.trim();

console.log("Includes JavaScript:", cleanText.includes("JavaScript"));
console.log("Starts with Java:", cleanText.startsWith("Java"));
console.log("Ends with Powerful:", cleanText.endsWith("Powerful"));
console.log("Index of Powerful:", cleanText.indexOf("Powerful"));
console.log("Slice:", cleanText.slice(0, 10));
console.log("Replace:", cleanText.replace("Powerful", "Interesting"));

let fruits = "Apple,Banana,Mango";
console.log("Split:", fruits.split(","));


console.log("===== 10. NUMBER CONVERSION =====");

console.log('parseInt("25"):', parseInt("25"));
console.log('parseInt("25px"):', parseInt("25px"));
console.log('parseInt("25.9"):', parseInt("25.9"));

console.log('parseFloat("25.9"):', parseFloat("25.9"));
console.log('parseFloat("25.9px"):', parseFloat("25.9px"));

console.log('Number("100"):', Number("100"));
console.log('Number("25px"):', Number("25px")); // NaN
console.log('Number(""):', Number(""));         // 0


console.log("===== 11. NaN CHECKING =====");

let invalidNumber = Number("hello");

console.log("Value:", invalidNumber);
console.log("Number.isNaN:", Number.isNaN(invalidNumber));

// Number.isNaN does not coerce its argument.
console.log('Number.isNaN("hello"):', Number.isNaN("hello"));
console.log('global isNaN("hello"):', isNaN("hello"));


console.log("===== 12. MATH METHODS =====");

console.log("round(4.6):", Math.round(4.6));
console.log("floor(4.9):", Math.floor(4.9));
console.log("ceil(4.1):", Math.ceil(4.1));
console.log("trunc(4.9):", Math.trunc(4.9));
console.log("abs(-25):", Math.abs(-25));
console.log("max:", Math.max(10, 25, 5, 40)); 
console.log("min:", Math.min(10, 25, 5, 40));
console.log("sqrt(64):", Math.sqrt(64));
console.log("2 ** 3:", 2 ** 3);

let random1to10 = Math.floor(Math.random() * 10) + 1;
console.log("Random 1–10:", random1to10);


console.log("===== 13. PRACTICAL CALCULATOR =====");

let num1 = 20;
let num2 = 5;

console.log(`Addition: ${num1 + num2}`);
console.log(`Subtraction: ${num1 - num2}`);
console.log(`Multiplication: ${num1 * num2}`);
console.log(`Division: ${num1 / num2}`);
console.log(`Remainder: ${num1 % num2}`);


console.log("===== 14. STUDENT MARKS =====");

let studentName = "Aman";
let html = 85;
let css = 90;
let javascript = 88;

let total = html + css + javascript;
let percentage = total / 3;

console.log(`Student: ${studentName}`);
console.log(`Total: ${total}`);
console.log(`Percentage: ${percentage.toFixed(2)}`);


console.log("===== 15. FORM-LIKE INPUT CONVERSION =====");

// Values from HTML forms commonly arrive as strings.
let quantity = "5";
let price = "100";

let totalPrice = Number(quantity) * Number(price);
console.log(`Total price = ₹${totalPrice}`);


