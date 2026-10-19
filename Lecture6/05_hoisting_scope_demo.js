// Hoisting and Scope 


console.log("=== Function Declaration Hoisting ===");

sayHi();

function sayHi() {
    console.log("Hi!");
}


console.log("\n=== var Hoisting ===");

console.log(score); // undefined
var score = 90;
console.log(score);


console.log("\n=== let and const ===");

// The following produce ReferenceError because of the Temporal Dead Zone.
// console.log(age);
// let age = 20;

// console.log(name);
// const name = "Aman";


console.log("\n=== Block Scope ===");

if (true) {
    var x = 10;
    let y = 20;
    const z = 30;

    console.log(x, y, z);
}

console.log("var outside block:", x);
// console.log(y); // ReferenceError
// console.log(z); // ReferenceError


console.log("\n=== Function Scope ===");

function testScope() {
    var localValue = "local";

    console.log(localValue);
}

testScope();

// console.log(localValue); // ReferenceError


console.log("\n=== Shadowing ===");

const value = "outer";

function showValue() {
    const value = "inner";
    console.log(value);
}

showValue();
console.log(value);
