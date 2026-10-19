// JavaScript Variables, Data Types & Type Conversion
 
console.log("=== 1. var, let and const ===");

var oldVariable = 10;
oldVariable = 20;
console.log("var:", oldVariable);

let score = 50;
score = 80;
console.log("let:", score);

const college = "ABC University";
console.log("const:", college);

console.log("\n=== 2. Primitive values ===");

let studentName = "Rahul";
let age = 21;
let isStudent = true;
let result;
let emptyValue = null;
let bigNumber = 123n;

console.log(studentName, age, isStudent, result, emptyValue, bigNumber);

console.log("\n=== 3. typeof ===");

console.log("string:", typeof studentName);
console.log("number:", typeof age);
console.log("boolean:", typeof isStudent);
console.log("undefined:", typeof result);
console.log("null:", typeof emptyValue);
console.log("bigint:", typeof bigNumber);
console.log("array:", typeof []);
console.log("object:", typeof {});
console.log("function:", typeof function () {});

console.log("\n=== 4. NaN ===");

let invalidNumber = Number("Hello");

console.log("Value:", invalidNumber);
console.log("Type:", typeof invalidNumber);
console.log("Is NaN:", Number.isNaN(invalidNumber));

console.log("\n=== 5. Reference value ===");

let student1 = { name: "Rahul" };
let student2 = student1;

student2.name = "Amit";

console.log("student1:", student1);
console.log("student2:", student2);

console.log("\n=== 6. Explicit conversion ===");

console.log(Number("100"));
console.log(String(100));
console.log(Boolean(1));

console.log("\n=== 7. Implicit coercion ===");

console.log('"10" + 5 =', "10" + 5);
console.log('"10" - 5 =', "10" - 5);
console.log('"10" * 2 =', "10" * 2);

console.log("\n=== 8. Truthy and falsy ===");

console.log('Boolean("Hello"):', Boolean("Hello"));
console.log('Boolean(""):', Boolean(""));
console.log("Boolean(1):", Boolean(1));
console.log("Boolean(0):", Boolean(0));
console.log("Boolean([]):", Boolean([]));
console.log("Boolean({}):", Boolean({}));

console.log("\n=== 9. Equality ===");

console.log("5 == '5':", 5 == "5");
console.log("5 === '5':", 5 === "5");
