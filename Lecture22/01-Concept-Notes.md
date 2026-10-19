# Callbacks & Callback Hell

## 1. Learning objectives
After studying this topic, you should be able to:
- Explain what a callback is and why functions can be passed as arguments.
- Distinguish synchronous and asynchronous callbacks.
- Design success and error callback patterns.
- Recognize callback hell and explain its readability, error-handling, and debugging problems.
- Refactor deeply nested callbacks into named functions or Promise-based code.
- Build a multi-step order or registration workflow.

## 2. What is a function?
A function is a reusable block of code that can accept inputs, perform work, and optionally return a value.

```js
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
```

JavaScript functions are first-class values. You can assign them to variables, return them from other functions, and pass them as arguments.

```js
function sayHello() {
  console.log("Hello!");
}
const action = sayHello;
action(); // Hello!
```

Important distinction:
- `sayHello` is a function reference.
- `sayHello()` calls the function immediately and passes its return value.

## 3. What is a callback?
A callback is a function passed to another function so the receiving function can call it at an appropriate time.

```js
function processUser(name, callback) {
  console.log(`Processing ${name}`);
  callback(name);
}

function showWelcome(name) {
  console.log(`Welcome, ${name}!`);
}

processUser("Aarav", showWelcome);
```

Output:
```text
Processing Aarav
Welcome, Aarav!
```

Callbacks are commonly used for:
- Event handling (`button.addEventListener("click", callback)`)
- Array operations (`map`, `filter`, `forEach`, `sort`)
- Timers (`setTimeout(callback, 1000)`)
- Node.js APIs and streams
- APIs that notify code when a task succeeds or fails

## 4. Functions as arguments
```js
function calculate(a, b, operation) {
  return operation(a, b);
}

const multiply = (x, y) => x * y;
console.log(calculate(4, 5, multiply)); // 20
console.log(calculate(4, 5, (x, y) => x + y)); // 9
```
`operation` is a parameter whose value is a function. The caller decides which behavior to provide.

### Common mistake: invoking instead of passing
```js
function greet() {
  console.log("Hi");
}

// Correct: pass a function to be called later.
setTimeout(greet, 1000);

// Usually incorrect when a callback reference is expected:
// setTimeout(greet(), 1000); // greet runs immediately; its return value is passed.
```

## 5. Synchronous callbacks
A synchronous callback is invoked before the outer function returns.

```js
function runNow(callback) {
  console.log("Before");
  callback();
  console.log("After");
}
runNow(() => console.log("Callback"));
// Output: Before, Callback, After
```

Array methods such as `forEach`, `map`, and `filter` usually invoke their callback synchronously as part of that method call.

```js
[1, 2, 3].forEach(number => console.log(number));
console.log("Done");
// Output: 1, 2, 3, Done
```

## 6. Asynchronous callbacks
An asynchronous callback is scheduled to run later, after the current synchronous code has continued or finished.

```js
console.log("Start");
setTimeout(() => console.log("Timer callback"), 0);
console.log("End");
// Output: Start, End, Timer callback
```

The callback is not necessarily executed by a separate JavaScript thread. For example, a timer callback is scheduled by the runtime and later executed on the event loop.

## 7. Synchronous vs asynchronous callbacks
| Point | Synchronous callback | Asynchronous callback |
|---|---|---|
| Timing | During the current function call | Later, after scheduling |
| Example | `array.map(fn)` | `setTimeout(fn, 0)` |
| Ordering | Callback finishes before outer call continues | Outer synchronous code can continue first |
| Typical use | Transforming or inspecting data | Timers, I/O, event responses |
| Debugging | Often easier to trace linearly | Requires tracking scheduling and later execution |

A callback is not inherently synchronous or asynchronous. The API that invokes it determines when it runs.

## 8. Success and error callbacks
An API may accept callbacks for both success and failure.

### Separate callbacks
```js
function loadProfile(onSuccess, onError) {
  setTimeout(() => {
    const succeeded = Math.random() > 0.3;
    if (succeeded) {
      onSuccess({ id: 7, name: "Aarav" });
    } else {
      onError(new Error("Could not load profile"));
    }
  }, 500);
}

loadProfile(
  profile => console.log("Loaded:", profile),
  error => console.error("Failed:", error.message)
);
```

This is easy to understand for a small operation, but passing many callbacks through many layers can become cumbersome.

### Error-first callback convention
Node.js APIs traditionally use `(error, result)`:
- If `error` is non-null, handle the failure.
- Otherwise, use the result.

```js
function readUser(callback) {
  setTimeout(() => {
    const error = null;
    const user = { id: 1, name: "Mira" };
    callback(error, user);
  }, 200);
}

readUser((error, user) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(user.name);
});
```

### Important error-handling rules
- Check errors before using result data.
- Return after handling an error when continuing would be unsafe.
- Do not silently swallow errors.
- Ensure a callback is not accidentally invoked twice.
- Understand whether the API reports errors through callbacks, thrown exceptions, or Promise rejections.
- A `try/catch` around scheduling an asynchronous callback does not automatically catch errors thrown later inside that callback.

## 9. What is callback hell?
Callback hell is deeply nested callback-based code where each asynchronous step depends on the previous step. It is sometimes called the “pyramid of doom.”

```js
registerUser(form, (error, user) => {
  if (error) return showError(error);
  verifyEmail(user, (error, verification) => {
    if (error) return showError(error);
    createProfile(user, (error, profile) => {
      if (error) return showError(error);
      sendWelcomeEmail(user, (error) => {
        if (error) return showError(error);
        showSuccess(profile);
      });
    });
  });
});
```

### Why it is a problem
1. **Readability:** indentation grows with each dependent step.
2. **Error handling:** repeated checks are easy to omit or implement inconsistently.
3. **Debugging:** control flow jumps between callback registrations and later execution.
4. **Maintenance:** changing the sequence can require edits at multiple nesting levels.
5. **Variable scope:** deeply nested closures can make it harder to see which values are available.
6. **Testing:** each branch and timing scenario may need explicit tests.
7. **Duplicate completion:** poorly designed APIs may call success/error callbacks more than once.

Callbacks themselves are not bad. The issue is uncontrolled nesting and unclear control flow.

## 10. How to avoid callback hell

### A. Use named functions
```js
function onEmailVerified(error, result) {
  if (error) return showError(error);
  createProfile(result.user, onProfileCreated);
}
function onProfileCreated(error, profile) {
  if (error) return showError(error);
  showSuccess(profile);
}
```
Named functions reduce indentation and improve stack traces, although they do not automatically eliminate all control-flow complexity.

### B. Use early returns
Handle error cases first to avoid deeply nested `if/else` blocks.

### C. Split responsibilities
Use small functions for validation, persistence, notification, and UI updates.

### D. Use Promises
Promises represent a value that may be available now, later, or never (if rejected). They support `.then()`, `.catch()`, and `.finally()`.

```js
saveUser(form)
  .then(user => verifyEmail(user))
  .then(verification => createProfile(verification.user))
  .then(profile => sendWelcomeEmail(profile).then(() => profile))
  .then(profile => showSuccess(profile))
  .catch(error => showError(error));
```

### E. Use `async` / `await`
This lets Promise-based asynchronous code read in a sequential style.

```js
async function register(form) {
  try {
    const user = await saveUser(form);
    const verification = await verifyEmail(user);
    const profile = await createProfile(verification.user);
    await sendWelcomeEmail(profile);
    showSuccess(profile);
  } catch (error) {
    showError(error);
  }
}
```
`await` pauses that async function until the Promise settles; it does not block the entire JavaScript thread.

## 11. Debugging callback-based code
- Add logs with a step label and relevant identifier.
- Log both success and error branches.
- Inspect stack traces and the browser/Node debugger's async call stack where available.
- Set breakpoints inside callbacks, not just where they are registered.
- Check whether callbacks can run more than once.
- Verify the API's callback signature and error convention.
- Avoid logging sensitive user data.
- Use small functions and deterministic test doubles for repeatable tests.

Example:
```js
function fetchOrder(id, callback) {
  console.log(`[fetchOrder] started: ${id}`);
  setTimeout(() => {
    if (!id) {
      console.error("[fetchOrder] missing id");
      callback(new Error("Order ID is required"));
      return;
    }
    console.log(`[fetchOrder] completed: ${id}`);
    callback(null, { id, status: "created" });
  }, 300);
}
```

## 12. Order simulator: workflow
The included practice app demonstrates this chain:
1. Validate the form.
2. Create an order/registration.
3. Process payment (simulated).
4. Confirm the order.
5. Send a confirmation (simulated).
6. Display a final result or error.

The UI uses callbacks to model each asynchronous stage and offers a toggle to simulate failure. It is a learning demo only; it does not process real payments or register real users.

## 13. Quick revision
- A callback is a function passed to another function.
- A callback can be synchronous or asynchronous.
- `fn` passes a function reference; `fn()` executes it.
- Error-first callbacks commonly use `(error, result)`.
- Callback hell is mainly about nested dependent callbacks and difficult control flow.
- Named functions, early returns, modular design, Promises, and `async`/`await` can improve readability.
- Always define who owns error handling and how many times a callback may run.
