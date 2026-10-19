# Important Questions: Callbacks & Callback Hell

## A. Fundamentals

### 1. What is a callback?
A function passed as an argument to another function so it can be invoked by that function.

### 2. What does it mean that functions are first-class values in JavaScript?
Functions can be stored in variables, passed as arguments, returned from functions, and stored in data structures.

### 3. What is the difference between `callback` and `callback()`?
`callback` refers to the function. `callback()` invokes it immediately and evaluates to its return value.

### 4. Why are callbacks useful?
They let code supply behavior to another function, handle events, process collections, and respond when asynchronous operations complete.

### 5. Is every callback asynchronous?
No. `map`, `forEach`, and a custom function can invoke callbacks synchronously. Timers and many I/O APIs invoke callbacks later.

### 6. Give an example of a synchronous callback.
```js
[1, 2, 3].map(n => n * 2);
```
The mapping callback runs as part of the `map` call.

### 7. Give an example of an asynchronous callback.
```js
setTimeout(() => console.log("later"), 500);
```

### 8. What is a higher-order function?
A function that accepts another function as an argument, returns a function, or both.

## B. Error handling

### 9. What is an error-first callback?
A common Node.js convention where the callback's first argument is an error (or `null` if no error occurred), followed by result data.

### 10. Why should an error branch often use `return`?
To stop the current callback from continuing into success logic after an error has been handled.

### 11. What is the danger of calling a callback twice?
The caller may process duplicate results, send multiple responses, or corrupt state. APIs should define and enforce one completion path.

### 12. Does `try/catch` around `setTimeout` catch errors thrown later inside its callback?
No. The callback runs later, outside the original `try` block's execution. Handle errors within the callback or use a Promise rejection pattern as appropriate.

### 13. How should sensitive data be handled in callback logs?
Avoid logging passwords, tokens, payment details, or unnecessary personal data. Log stable IDs and safe status messages instead.

## C. Callback hell

### 14. What is callback hell?
Deeply nested callbacks used to coordinate dependent asynchronous operations, producing hard-to-read “pyramid of doom” code.

### 15. What problems does callback hell cause?
Poor readability, tangled control flow, repeated error handling, difficult debugging/testing, and fragile maintenance.

### 16. Are callbacks themselves bad?
No. Callbacks are useful. Excessive nesting and unclear error/control-flow conventions are the problem.

### 17. Name ways to avoid callback hell.
Use named functions, early returns, smaller responsibilities, Promises, `async`/`await`, and consistent error handling.

### 18. How do Promises improve the flow?
They allow dependent steps to be chained with `.then()` and errors to be handled in a shared `.catch()` path.

### 19. Does `async`/`await` eliminate asynchrony?
No. It changes the syntax for working with Promises so the code reads more sequentially.

### 20. What is the difference between sequential and parallel asynchronous work?
Sequential work awaits one dependent step before starting the next. Independent work can often be started together and coordinated with `Promise.all()`.

## D. Predict the output

### 21.
```js
function run(cb) {
  console.log("A");
  cb();
  console.log("B");
}
run(() => console.log("C"));
```
**Answer:** A, C, B.

### 22.
```js
console.log("start");
setTimeout(() => console.log("timer"), 0);
console.log("end");
```
**Answer:** start, end, timer.

### 23.
```js
[1, 2].forEach(n => console.log(n));
console.log("done");
```
**Answer:** 1, 2, done.

### 24.
```js
setTimeout(() => console.log("callback"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("sync");
```
**Answer:** sync, promise, callback in typical modern browser/Node environments.

### 25.
```js
function operation(callback) {
  callback(null, "first");
  callback(null, "second");
}
operation((err, result) => console.log(result));
```
**Answer:** first, second. This demonstrates why APIs should avoid completing the same operation twice.

## E. Practical and scenario questions

### 26. How would you model an order workflow with callbacks?
Validate input, create an order, process payment, confirm the order, and send a notification. Each step calls the next only after success and passes errors to a shared error handler.

### 27. How can callback-based code be easier to debug?
Use named functions, step-specific logs, breakpoints inside callbacks, explicit error branches, and tests for success and failure paths.

### 28. How would you avoid deeply nested registration logic?
Wrap callback APIs in Promises where suitable, then compose the sequence using `async`/`await` and `try/catch`.

### 29. What should a callback API document?
Callback arguments, whether execution is sync or async, whether it may run more than once, error conventions, cancellation behavior, and completion guarantees.

### 30. What is inversion of control in callback APIs?
The caller gives a function to another piece of code and relies on that code to invoke it at the correct time. Poorly specified APIs can make that control harder to reason about.

## F. Coding challenges

1. Write `calculate(a, b, callback)` that accepts an operation and returns the result.
2. Write `delay(ms, callback)` using `setTimeout`.
3. Create an error-first callback API that returns a mock user or an error for a missing ID.
4. Refactor the nested workflow in `02-Examples/04-callback-hell.js` using named functions.
5. Refactor it again using Promises and `async`/`await`.
6. Add a “retry” option to the simulator for a failed step.
7. Explain how to prevent the Start button from launching duplicate workflows.
8. Add tests for invalid email, simulated payment failure, and successful completion.
