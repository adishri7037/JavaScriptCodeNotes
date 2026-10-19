
## Theory / Interview Questions

1. What is a function in JavaScript, and why are functions useful?

2. What is the difference between a function declaration and a function expression? Give one example of each.

3. What is an arrow function? Convert a normal function into an equivalent arrow function.

4. Explain the difference between parameters and arguments with an example.

5. What are default parameters and rest parameters? Write a function that uses both.

6. What is the purpose of the `return` statement? What happens to code written after a `return` statement?

7. Explain global scope, function scope, and block scope. How do `var`, `let`, and `const` differ with respect to scope?

8. What is hoisting? Explain the beginner-level behavior of function declarations, `var`, `let`, and `const`.

9. What is an execution context? Explain the basic idea of global execution context and function execution context.

10. What is the call stack? Trace the order of function calls for:
```js
function first() {
    second();
}

function second() {
    third();
}

function third() {
    console.log("Hello");
}

first();
```

---

## Coding Practice Questions

1. Write a function that accepts two numbers and returns the larger number.

2. Write an arrow function that checks whether a number is even.

3. Write a function using a default parameter to calculate the final price after tax.

4. Write a function using a rest parameter to calculate the average of any number of marks.

5. Write a function that uses early returns to validate a user's age.

6. Write a function that counts vowels in a string.

7. Write a function that returns the largest number from a rest parameter list.

8. Predict the output:
```js
console.log(x);
var x = 10;
```

9. Predict what happens:
```js
console.log(x);
let x = 10;
```

10. Identify the scope of each variable:
```js
const a = 10;

function demo() {
    const b = 20;

    if (true) {
        let c = 30;
        var d = 40;
    }
}
```
