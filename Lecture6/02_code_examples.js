// Functions, Scope & Execution Context Basics


console.log("=== 1. Function Declaration ===");

function add(a, b) {
    return a + b;
}

console.log(add(10, 20));


console.log("\n=== 2. Function Expression ===");

const multiply = function (a, b) {
    return a * b;
};

console.log(multiply(5, 4));


console.log("\n=== 3. Arrow Functions ===");

const square = n => n * n;
const subtract = (a, b) => a - b;
const sayHello = () => "Hello, JavaScript!";

console.log(square(6));
console.log(subtract(20, 8));
console.log(sayHello());


console.log("\n=== 4. Parameters and Arguments ===");

function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Aditya"));


console.log("\n=== 5. Default Parameters ===");

function calculatePrice(price, taxRate = 0.18) {
    return price + price * taxRate;
}

console.log(calculatePrice(1000));
console.log(calculatePrice(1000, 0.05));


console.log("\n=== 6. Rest Parameters ===");

function sum(...numbers) {
    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total;
}

console.log(sum(1, 2, 3));
console.log(sum(10, 20, 30, 40));


console.log("\n=== 7. Rest Parameter with Normal Parameter ===");

function introduce(name, ...skills) {
    console.log("Name:", name);
    console.log("Skills:", skills);
}

introduce("Aman", "HTML", "CSS", "JavaScript");


console.log("\n=== 8. Return Value ===");

function double(n) {
    return n * 2;
}

const result = double(10);
console.log("Result:", result);


console.log("\n=== 9. Early Return ===");

function checkAge(age) {
    if (age < 18) {
        return "Not eligible";
    }

    return "Eligible";
}

console.log(checkAge(16));
console.log(checkAge(21));


console.log("\n=== 10. Global and Function Scope ===");

const college = "ABC Institute";

function showCollege() {
    const message = "Inside function";
    console.log(college);
    console.log(message);
}

showCollege();


console.log("\n=== 11. Block Scope ===");

if (true) {
    var varValue = "var is function-scoped";
    let letValue = "let is block-scoped";
    const constValue = "const is block-scoped";

    console.log(varValue);
    console.log(letValue);
    console.log(constValue);
}

console.log(varValue);
// console.log(letValue);  // Uncomment to see ReferenceError
// console.log(constValue); // Uncomment to see ReferenceError


console.log("\n=== 12. Nested Scope ===");

const globalMessage = "Global";

function outerFunction() {
    const outerMessage = "Outer";

    function innerFunction() {
        const innerMessage = "Inner";

        console.log(globalMessage);
        console.log(outerMessage);
        console.log(innerMessage);
    }

    innerFunction();
}

outerFunction();


console.log("\n=== 13. Shadowing ===");

const message = "Global message";

function shadowDemo() {
    const message = "Local message";
    console.log(message);
}

shadowDemo();
console.log(message);


console.log("\n=== 14. Hoisting: Function Declaration ===");

hoistedGreeting();

function hoistedGreeting() {
    console.log("Function declaration can be called before declaration.");
}


console.log("\n=== 15. Hoisting: var ===");

console.log(varExample); // undefined
var varExample = 100;
console.log(varExample);


console.log("\n=== 16. let/const TDZ ===");

// console.log(letExample); // ReferenceError
let letExample = 200;
console.log(letExample);

// console.log(constExample); // ReferenceError
const constExample = 300;
console.log(constExample);


console.log("\n=== 17. Execution Context and Call Stack ===");

function first() {
    console.log("first() started");
    second();
    console.log("first() finished");
}

function second() {
    console.log("second() running");
}

first();


console.log("\n=== 18. Recursion and Call Stack ===");

function countDown(n) {
    if (n === 0) {
        return;
    }

    console.log(n);
    countDown(n - 1);
}

countDown(3);


console.log("\n=== 19. Student Result Calculator ===");

function calculateAverage(...marks) {
    if (marks.length === 0) {
        return 0;
    }

    let total = 0;

    for (const mark of marks) {
        total += mark;
    }

    return total / marks.length;
}

function getGrade(average) {
    if (average < 0 || average > 100) {
        return "Invalid";
    }

    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";

    return "F";
}

const average = calculateAverage(85, 90, 78, 92);

console.log("Average:", average);
console.log("Grade:", getGrade(average));


console.log("\n=== 20. Utility Functions ===");

const isEven = number => number % 2 === 0;

const max = (a, b) => {
    if (a > b) return a;
    return b;
};

function formatName(firstName = "Unknown", lastName = "") {
    return `${firstName} ${lastName}`.trim();
}

console.log(isEven(10));
console.log(max(10, 25));
console.log(formatName("Aditya", "Kumar"));
