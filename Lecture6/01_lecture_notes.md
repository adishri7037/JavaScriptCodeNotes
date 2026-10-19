# Functions, Scope & Execution Context Basics

## 1. What Is a Function?

A function is a reusable block of code designed to perform a particular task.

### Basic syntax
```js
function greet() {
    console.log("Hello, students!");
}

greet();
```

A function normally has:
1. A function name
2. Parameters (optional)
3. A function body
4. A return value (optional)

Functions help us avoid repeated code and make programs easier to test and maintain.

---

## 2. Function Declaration

A function declaration defines a named function using the `function` keyword.

```js
function add(a, b) {
    return a + b;
}

console.log(add(10, 20)); // 30
```

### Important point
Function declarations are hoisted, so they can generally be called before their declaration.

```js
sayHello();

function sayHello() {
    console.log("Hello!");
}
```

Output:
```text
Hello!
```

---

## 3. Function Expression

A function can be stored inside a variable. This is called a function expression.

```js
const multiply = function (a, b) {
    return a * b;
};

console.log(multiply(5, 4)); // 20
```

The function is anonymous here because it does not have its own name.

### Named function expression
```js
const factorial = function calculateFactorial(n) {
    if (n <= 1) return 1;
    return n * calculateFactorial(n - 1);
};

console.log(factorial(5)); // 120
```

Function expressions assigned to `const`/`let` should not be called before the initialization line.

---

## 4. Arrow Functions

Arrow functions provide a shorter syntax for writing functions.

### Traditional function
```js
function square(n) {
    return n * n;
}
```

### Arrow equivalent
```js
const square = (n) => {
    return n * n;
};
```

### Concise arrow function
When there is one expression, the value is returned automatically.

```js
const cube = n => n * n * n;

console.log(cube(3)); // 27
```

### Multiple parameters
```js
const add = (a, b) => a + b;
```

### No parameters
```js
const greet = () => "Hello!";
```

### Important beginner note
Arrow functions are not just shorter syntax. They also behave differently from regular functions with respect to `this`, `arguments`, and constructor usage. For this lecture, focus mainly on their syntax and normal function use.

---

## 6. Parameters vs Arguments

A **parameter** is the variable listed in the function definition.

An **argument** is the actual value supplied when the function is called.

```js
function greet(name) {   // name = parameter
    console.log("Hello " + name);
}

greet("Aditya");         // "Aditya" = argument
```

Another example:

```js
function add(a, b) {
    return a + b;
}

add(10, 20);
```

Here `a` and `b` are parameters, while `10` and `20` are arguments.

---

## 7. Default Parameters

A default parameter provides a fallback value when an argument is missing (or `undefined`).

```js
function greet(name = "Student") {
    return `Hello, ${name}!`;
}

console.log(greet("Rahul")); // Hello, Rahul!
console.log(greet());       // Hello, Student!
```

Another example:

```js
function calculatePrice(price, taxRate = 0.18) {
    return price + price * taxRate;
}

console.log(calculatePrice(1000));      // 1180
console.log(calculatePrice(1000, 0.05)); // 1050
```

---

## 8. Rest Parameters

Rest parameters collect multiple arguments into an array.

Syntax:
```js
function functionName(...values) {
    // values is an array
}
```

Example:

```js
function sum(...numbers) {
    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total;
}

console.log(sum(10, 20));          // 30
console.log(sum(1, 2, 3, 4, 5));  // 15
```

### Parameter before rest parameter
The rest parameter must be the last parameter.

```js
function introduce(name, ...skills) {
    console.log("Name:", name);
    console.log("Skills:", skills);
}

introduce("Aman", "HTML", "CSS", "JavaScript");
```

Do not write:
```js
// Invalid
function example(...values, last) {}
```

---

## 9. Return Values

`return` sends a value from the function back to the caller.

```js
function subtract(a, b) {
    return a - b;
}

const result = subtract(20, 8);

console.log(result); // 12
```

A returned value can be:
- stored in a variable
- printed
- passed to another function
- used in an expression

```js
function double(n) {
    return n * 2;
}

console.log(double(5) + 10); // 20
```

### Return stops the function

```js
function test() {
    return "Done";

    console.log("This will not execute");
}

console.log(test());
```

---

## 10. Early Returns

An early return exits a function as soon as a condition is satisfied.

This often makes code easier to read.

```js
function checkAge(age) {
    if (age < 18) {
        return "Not eligible";
    }

    return "Eligible";
}

console.log(checkAge(16)); // Not eligible
console.log(checkAge(21)); // Eligible
```

### Practical validation example
```js
function calculateDiscount(price) {
    if (price <= 0) {
        return 0;
    }

    if (price >= 5000) {
        return price * 0.20;
    }

    return price * 0.10;
}

console.log(calculateDiscount(6000)); // 1200
```

Early returns can reduce deeply nested `if` statements.

---

## 11. Scope

Scope determines where a variable can be accessed.

The three beginner-level scopes are:
1. Global scope
2. Function scope
3. Block scope

---

## 12. Global Scope

A variable declared outside functions/blocks is generally in global scope.

```js
const college = "ABC Institute";

function showCollege() {
    console.log(college);
}

showCollege();
console.log(college);
```

Both accesses work because `college` is outside the function.

### Caution
Avoid unnecessary global variables because many parts of a program can access or modify global state, making debugging harder.

---

## 13. Function Scope

Variables declared with `var` inside a function are function-scoped.

```js
function demo() {
    var message = "Inside function";
    console.log(message);
}

demo();

// console.log(message); // ReferenceError
```

A function creates its own local environment.

---

## 14. Block Scope

`let` and `const` are block-scoped.

A block is commonly created by `{ }`, such as in `if`, `for`, and `while`.

```js
if (true) {
    let score = 90;
    const grade = "A";

    console.log(score);
    console.log(grade);
}

// console.log(score); // ReferenceError
// console.log(grade); // ReferenceError
```

### var vs let/const

```js
if (true) {
    var x = 10;
    let y = 20;
    const z = 30;
}

console.log(x); // 10
// console.log(y); // ReferenceError
// console.log(z); // ReferenceError
```

---

## 15. Nested Scope and Scope Chain

Inner code can access variables from its outer scope.

```js
const outer = "I am global";

function outerFunction() {
    const middle = "I am in outerFunction";

    function innerFunction() {
        const inner = "I am local";
        console.log(outer);
        console.log(middle);
        console.log(inner);
    }

    innerFunction();
}

outerFunction();
```

The inner function can look outward for variables. This lookup is often described as the **scope chain**.

---

## 16. Shadowing

A local variable can have the same name as an outer variable.

```js
const message = "Global";

function demo() {
    const message = "Local";
    console.log(message);
}

demo();
console.log(message);
```

Output:
```text
Local
Global
```

The inner `message` shadows the outer `message` inside the function.

---

## 17. Hoisting — Beginner-Friendly Explanation

Hoisting describes behavior where JavaScript processes declarations before executing statements in the relevant scope.

### Function declarations

Function declarations can be called before their declaration.

```js
greet();

function greet() {
    console.log("Hello!");
}
```

### var

`var` declarations are hoisted and initialized with `undefined`.

```js
console.log(x); // undefined
var x = 10;
```

Conceptually, beginners can think of this roughly as:

```js
var x;
console.log(x);
x = 10;
```

This is a simplified teaching model, not a literal rewrite of the JavaScript engine.

### let and const

`let` and `const` declarations are also processed before execution, but they cannot be accessed before initialization. The period from entering the scope until initialization is commonly called the **Temporal Dead Zone (TDZ)**.

```js
// console.log(age); // ReferenceError
let age = 20;
```

```js
// console.log(name); // ReferenceError
const name = "Aman";
```

### Quick comparison

| Declaration | Can access before declaration? | Beginner rule |
|---|---|---|
| function declaration | Yes | Function declaration is hoisted |
| var | No useful value | Gives `undefined` before assignment |
| let | No | ReferenceError in TDZ |
| const | No | ReferenceError in TDZ |

Best practice: declare variables before using them.

---

## 18. Execution Context — Basic Idea

An **execution context** is the environment JavaScript creates to run code.

At a beginner level, think of it as a workspace containing information needed while code executes.

Commonly discussed contexts include:
- Global execution context
- Function execution context

Example:

```js
const x = 10;

function add(a, b) {
    const result = a + b;
    return result;
}

console.log(add(2, 3));
```

A simplified execution flow:

1. JavaScript starts with the global execution context.
2. `x` is available in the global scope.
3. `add(2, 3)` is called.
4. A new function execution context is created for `add`.
5. Parameters `a` and `b` receive `2` and `3`.
6. `result` becomes `5`.
7. `return result` sends `5` back.
8. The function context finishes.

---

## 19. Call Stack — Basic Idea

JavaScript uses a call stack to keep track of currently executing functions.

```js
function first() {
    second();
}

function second() {
    console.log("Inside second");
}

first();
```

Simplified stack flow:

```text
Global
  ↓
first()
  ↓
second()
  ↓
console.log()
```

When `second()` finishes, it is removed from the stack. Then `first()` finishes, and the program continues.

### Recursive example

```js
function countDown(n) {
    if (n === 0) {
        return;
    }

    console.log(n);
    countDown(n - 1);
}

countDown(3);
```

Each recursive call creates another function execution context. Excessive recursion can eventually cause a stack overflow.

---

## 20. Function Declaration vs Expression vs Arrow Function

```js
// Function declaration
function add(a, b) {
    return a + b;
}

// Function expression
const multiply = function (a, b) {
    return a * b;
};

// Arrow function
const subtract = (a, b) => a - b;

console.log(add(2, 3));
console.log(multiply(2, 3));
console.log(subtract(5, 2));
```

### Comparison

| Feature | Declaration | Expression | Arrow |
|---|---|---|---|
| Syntax | `function name(){}` | `const f = function(){}` | `const f = () => {}` |
| Named | Usually yes | Optional | Variable usually supplies the name |
| Hoisted for normal call | Yes | No before initialization | No before initialization |
| Concise syntax | No | No | Yes |
| `this` behavior | Regular function rules | Regular function rules | Lexical `this` |

---

## 21. Practical Example — Student Result Calculator

```js
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
```

This example combines:
- Function declarations
- Rest parameters
- Parameters and arguments
- Return values
- Early returns
- Conditions
- Scope

---

## 22. Practical Example — Reusable Utility Functions

```js
const isEven = number => number % 2 === 0;

const max = (a, b) => {
    if (a > b) return a;
    return b;
};

function formatName(firstName = "Unknown", lastName = "") {
    return `${firstName} ${lastName}`.trim();
}

console.log(isEven(10));                 // true
console.log(max(10, 25));                // 25
console.log(formatName("Aditya", "Kumar"));
```

---

## 23. Common Mistakes

### Mistake 1: Forgetting to call the function
```js
function greet() {
    console.log("Hello");
}

greet;     // only refers to the function
greet();   // calls the function
```

### Mistake 2: Confusing parameters and arguments
```js
function add(a, b) {
    return a + b;
}

add(5, 7);
```

`a`, `b` = parameters; `5`, `7` = arguments.

### Mistake 3: Expecting return to print
```js
function add(a, b) {
    return a + b;
}

add(2, 3); // returns 5, but does not print it

console.log(add(2, 3)); // prints 5
```

### Mistake 4: Accessing block-scoped variables outside the block
```js
if (true) {
    let value = 100;
}

// console.log(value); // ReferenceError
```

### Mistake 5: Using a let/const variable before initialization
```js
// console.log(score); // ReferenceError
let score = 50;
```



