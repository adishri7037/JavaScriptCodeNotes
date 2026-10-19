# Promises & Error Handling

## 1. Learning objectives
By the end of this topic, you should be able to:
- Explain what a Promise represents.
- Identify pending, fulfilled, and rejected states.
- Use `.then()`, `.catch()`, and `.finally()`.
- Chain asynchronous operations and pass values between them.
- Explain error propagation and recovery.
- Build a Promise-based task runner and simulated login flow.

## 2. What is a Promise?
A Promise is a JavaScript object representing the eventual completion or failure of an asynchronous operation and its resulting value.

```js
const promise = new Promise((resolve, reject) => {
  // Perform or start work.
  resolve("Success!");
});

promise.then(value => console.log(value));
```

The Promise executor function runs synchronously when `new Promise(...)` is created. Calling `resolve` or `reject` settles the Promise, but `.then()` handlers run asynchronously as microtasks.

## 3. Promise states
A Promise has three states:

1. **Pending:** initial state; it has not fulfilled or rejected yet.
2. **Fulfilled:** the operation completed successfully with a value.
3. **Rejected:** the operation failed with a reason, often an `Error`.

A Promise can settle only once: after it is fulfilled or rejected, later calls to `resolve` or `reject` do not change its state.

```js
const success = new Promise(resolve => resolve("done"));
const failure = new Promise((resolve, reject) => reject(new Error("failed")));
```

Technically, Promises also have a “resolved” concept: a Promise can be resolved to adopt another Promise's eventual state without being immediately fulfilled. For beginner state diagrams, focus on pending, fulfilled, and rejected.

## 4. Creating Promises
```js
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "Riya" });
      else reject(new Error("Invalid user ID"));
    }, 300);
  });
}

getUser(1)
  .then(user => console.log(user.name))
  .catch(error => console.error(error.message));
```

Use `resolve(value)` for success and `reject(error)` for failure. Prefer rejecting with an `Error` object so the error includes a message and stack trace.

## 5. `.then()`
`.then(onFulfilled, onRejected)` registers handlers and returns a **new Promise**.

```js
Promise.resolve(5)
  .then(value => value * 2)
  .then(value => {
    console.log(value); // 10
    return value + 1;
  })
  .then(value => console.log(value)); // 11
```

Rules:
- The fulfillment handler receives the fulfilled value.
- If the handler returns a normal value, the next Promise fulfills with that value.
- If it returns a Promise or thenable, the next Promise adopts its eventual state.
- If it throws, the next Promise rejects.
- If no fulfillment handler is provided, the value passes through unchanged.
- If no rejection handler is provided, the rejection passes through.

## 6. `.catch()`
`.catch(onRejected)` handles a rejection. It is equivalent to `.then(undefined, onRejected)`.

```js
Promise.reject(new Error("Network unavailable"))
  .catch(error => {
    console.error("Handled:", error.message);
    return { cached: true };
  })
  .then(result => console.log(result)); // { cached: true }
```

A catch handler that returns a value **recovers** the chain: the Promise returned by `.catch()` fulfills with that value. If the catch handler throws or returns a rejected Promise, the chain remains rejected.

### Important placement detail
```js
doWork()
  .then(firstStep)
  .catch(handleError)
  .then(nextStep);
```
If `handleError` returns normally, `nextStep` runs. If the error should stop the chain, rethrow it or return a rejected Promise.

## 7. `.finally()`
`.finally(handler)` runs after the Promise settles, whether fulfilled or rejected. It is commonly used for cleanup: hide a spinner, release a UI lock, or close a resource.

```js
showLoading(true);

fetchData()
  .then(renderData)
  .catch(showError)
  .finally(() => showLoading(false));
```

Important behavior:
- The handler normally receives no result or error argument.
- Its return value is usually ignored.
- If it throws or returns a rejected Promise, it can change the final outcome to rejection.
- Otherwise, the original value or rejection reason passes through.

## 8. Promise chaining
Each `.then()`, `.catch()`, and `.finally()` call returns a new Promise. This enables a sequence of operations.

```js
validateForm(form)
  .then(data => createAccount(data))
  .then(account => sendVerificationEmail(account))
  .then(result => showSuccess(result))
  .catch(error => showError(error))
  .finally(() => setLoading(false));
```

### Return values matter
Correct:
```js
function loadAndTransform() {
  return fetch("/api/data")
    .then(response => response.json())
    .then(data => data.items);
}
```

Common bug: forgetting `return` in a chain callback:
```js
doFirst()
  .then(value => {
    doSecond(value); // not returned; chain does not wait for it
  })
  .then(() => console.log("May run before doSecond finishes"));
```

Correct version:
```js
doFirst()
  .then(value => doSecond(value))
  .then(result => console.log("Second result:", result));
```

## 9. Error propagation
If a Promise rejects, or a handler throws an error, the rejection travels down the chain until a rejection handler catches it.

```js
Promise.resolve()
  .then(() => {
    throw new Error("Unexpected issue");
  })
  .then(() => console.log("Skipped"))
  .catch(error => console.log(error.message))
  .then(() => console.log("Recovery path"));
```
Output:
```text
Unexpected issue
Recovery path
```

A rejection skips fulfillment handlers until a rejection handler is encountered. After recovery, later fulfillment handlers can run.

### Throwing inside a handler
A thrown error inside `.then()` becomes a rejection of the Promise returned by `.then()`. This is why it can be handled by a later `.catch()`.

### `try/catch` and Promises
A synchronous `try/catch` does not catch a rejection that is not awaited or returned into the current flow:
```js
try {
  Promise.reject(new Error("No handler"));
} catch (error) {
  // This does not catch the Promise rejection.
}
```
Use `.catch(...)`, or inside an async function use `try { await promise; } catch (error) { ... }`.

## 10. Error recovery patterns

### A. Return a fallback value
```js
getSettings()
  .catch(error => {
    console.warn("Using defaults:", error.message);
    return { theme: "light" };
  });
```

### B. Retry an operation
```js
function retry(operation, attempts = 3) {
  return operation().catch(error => {
    if (attempts <= 1) throw error;
    return retry(operation, attempts - 1);
  });
}

// Example:
// retry(() => fetchData(), 3);
```
A production retry policy should usually include backoff, cancellation, and rules about which errors are safe to retry.

### C. Recover only from selected errors
```js
loadProfile()
  .catch(error => {
    if (error.code === "NOT_FOUND") return { name: "Guest" };
    throw error;
  });
```

### D. Cleanup in `finally`
Use `finally` for cleanup that should happen regardless of outcome, not for deciding success vs. failure.

## 11. Useful Promise utilities
- `Promise.resolve(value)`: creates a fulfilled Promise (or adopts a Promise/thenable).
- `Promise.reject(error)`: creates a rejected Promise.
- `Promise.all(iterable)`: fulfills when all fulfill; rejects when one rejects.
- `Promise.allSettled(iterable)`: waits for every Promise to settle and returns outcome records.
- `Promise.race(iterable)`: settles with the first Promise to settle.
- `Promise.any(iterable)`: fulfills with the first fulfillment; rejects with `AggregateError` if all reject.

These utilities are useful when coordinating independent asynchronous operations.

## 12. Debugging Promise chains
- Return Promises from every chain step that must be awaited.
- Add a final `.catch()` at the boundary where you can handle/report failure.
- Use meaningful error messages and preserve the original error when rethrowing.
- Avoid empty catches such as `.catch(() => {})`.
- Use DevTools breakpoints and inspect stack traces.
- Distinguish a handled rejection from a recovered operation.
- Test success, failure, fallback, retry exhaustion, and cleanup.
- Do not log passwords, tokens, or other secrets.

## 13. Practice projects
### Promise-based task runner
Run tasks sequentially, show status, allow a task failure, and recover or stop depending on the selected option. This demonstrates chaining, return values, rejection, catch, and finally.

### Simulated login flow
Validate fields, check mock credentials, simulate fetching a profile, and show success or an error. Includes loading-state cleanup with `finally`. It is a browser-only demo and not real authentication.

## 14. Quick revision
- Pending → fulfilled or rejected.
- `.then()` handles success and can transform values.
- `.catch()` handles rejection and can recover by returning a value.
- `.finally()` runs cleanup after settlement.
- Each chain method returns a new Promise.
- Return a Promise from a handler when the next step must wait for it.
- Thrown errors and returned rejections propagate down the chain until handled.
