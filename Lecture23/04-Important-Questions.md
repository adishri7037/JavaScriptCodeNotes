# Important Questions: Promises & Error Handling

## A. Promise fundamentals

### 1. What is a Promise?
An object representing the eventual success or failure of an asynchronous operation.

### 2. What are the three Promise states?
Pending, fulfilled, and rejected. A settled Promise is fulfilled or rejected.

### 3. Can a settled Promise change state?
No. It settles only once, though it may have been resolved to adopt another Promise's state.

### 4. Does the Promise executor run synchronously?
Yes. The function passed to `new Promise(executor)` runs immediately; `.then()` handlers run asynchronously as microtasks.

### 5. What is the difference between `resolve` and `reject`?
`resolve(value)` fulfills with a value or adopts a Promise/thenable; `reject(reason)` rejects with a reason.

### 6. Why prefer `Error` objects for rejection?
They provide a message, stack trace, and room for structured properties such as an error code.

## B. then, catch, finally

### 7. What does `.then()` do?
Registers fulfillment and optionally rejection handlers, then returns a new Promise.

### 8. What does `.catch()` do?
Registers a rejection handler. It is equivalent to `.then(undefined, onRejected)`.

### 9. What does `.finally()` do?
Runs a cleanup handler after fulfillment or rejection, normally preserving the original result or error.

### 10. Does `.finally()` receive the value or error?
No. Its callback is normally invoked without arguments.

### 11. Can `.finally()` change the outcome?
Yes. If its callback throws or returns a rejected Promise, the resulting chain rejects.

### 12. What happens if a `.then()` handler returns a value?
The next Promise in the chain fulfills with that value.

### 13. What if a `.then()` handler returns a Promise?
The next Promise adopts that Promise's eventual state.

### 14. What if a handler throws?
The Promise returned by that handler rejects with the thrown error.

## C. Chaining and errors

### 15. What is Promise chaining?
Connecting dependent asynchronous steps through the Promises returned by `.then()`, `.catch()`, and `.finally()`.

### 16. Why is returning a Promise from `.then()` important?
It allows the chain to wait for that operation and pass its result or rejection onward.

### 17. What is error propagation?
A rejection or thrown error travels through the chain, skipping fulfillment handlers until a rejection handler handles it.

### 18. How can `.catch()` recover?
Return a fallback value or a fulfilled Promise. The chain then continues through later fulfillment handlers.

### 19. How do you rethrow an error after logging it?
```js
.catch(error => {
  console.error("Operation failed", error);
  throw error;
});
```

### 20. Does a normal synchronous `try/catch` catch every Promise rejection?
No. Use `.catch()` or `try/catch` around an `await` inside an async function.

### 21. What happens if you omit `return` in a chain handler?
The next step receives `undefined` and does not wait for the unreturned asynchronous operation.

### 22. How should a loading indicator be turned off?
Use `.finally(() => setLoading(false))` so cleanup happens on success or failure.

## D. Output prediction

### 23.
```js
Promise.resolve(2)
  .then(n => n * 3)
  .then(n => n + 1)
  .then(console.log);
```
**Answer:** 7.

### 24.
```js
Promise.reject(new Error("oops"))
  .catch(() => "fallback")
  .then(console.log);
```
**Answer:** `fallback`. The catch returns a normal value and recovers the chain.

### 25.
```js
Promise.resolve()
  .then(() => { throw new Error("fail"); })
  .then(() => console.log("A"))
  .catch(() => console.log("B"))
  .then(() => console.log("C"));
```
**Answer:** B, C.

### 26.
```js
console.log("start");
Promise.resolve().then(() => console.log("promise"));
console.log("end");
```
**Answer:** start, end, promise.

### 27.
```js
Promise.resolve("original")
  .finally(() => "replacement")
  .then(console.log);
```
**Answer:** `original`. A normal `finally` return value is ignored.

### 28.
```js
Promise.resolve(10)
  .then(value => {
    Promise.resolve(value + 5); // missing return
  })
  .then(console.log);
```
**Answer:** `undefined`, because the first handler returns no value.

## E. Practical and design questions

### 29. How would you build a Promise-based task runner?
Represent each task as a Promise and chain dependent tasks. Use a catch handler to stop or recover, and finally to restore UI state.

### 30. How should a simulated login flow handle failures?
Validate input, reject invalid credentials, catch and display a safe error message, and use finally to re-enable the submit button.

### 31. What is the difference between `Promise.all()` and `Promise.allSettled()`?
`Promise.all()` rejects as soon as one input rejects; `Promise.allSettled()` waits for all inputs and returns each outcome.

### 32. When is retry appropriate?
For transient errors and operations that are safe to retry. Use limited attempts, delay/backoff, and avoid retrying non-idempotent actions without safeguards.

### 33. How can Promise chains be debugged?
Use named functions, breakpoints, clear error messages, a final error handler at the right boundary, and tests for rejection and recovery.

### 34. Why is an empty `.catch(() => {})` dangerous?
It silently hides failure and can make the application appear successful when work failed.

### 35. Is Promise-based login secure if credentials are checked in front-end JavaScript?
No. Client-side checks can be inspected or bypassed. Real authentication requires a trusted server, secure password handling, and appropriate session/token protections.

## F. Coding challenges

1. Create a Promise that resolves after one second.
2. Create a Promise that rejects when a supplied number is negative.
3. Chain three steps, returning a transformed value from each.
4. Add a fallback profile when a request rejects with `NOT_FOUND`, but rethrow other errors.
5. Write a retry helper with a maximum attempt count.
6. Use `Promise.all()` to load three independent resources.
7. Add a retry button to the simulated login demo.
8. Add a “task duration” field to the task runner and test failure, recovery, and finally cleanup.
