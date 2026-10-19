# Closures, Higher-order Functions & Functional Patterns

## 1. Lexical scope

**Scope** determines where a variable can be accessed. JavaScript uses lexical (static) scoping: access to a variable is determined by where a function is written in the source code, not where it is called.

```js
const language = "JavaScript";

function showLanguage() {
  console.log(language); // JavaScript
}

showLanguage();
```

A nested function can access variables in its own scope, its enclosing scopes, and the global scope. An outer function cannot access variables declared only inside its inner function.

```js
function outer() {
  const outerValue = "outer";

  function inner() {
    const innerValue = "inner";
    console.log(outerValue, innerValue);
  }

  inner();
  // console.log(innerValue); // ReferenceError
}
outer();
```

### Scope chain
When JavaScript evaluates an identifier, it looks in the current lexical environment, then each enclosing environment, and finally the global environment. If it cannot find the identifier, it throws a `ReferenceError`.

## 2. What is a closure?

A **closure** is created when a function retains access to variables from its lexical environment, even after the outer function has finished executing.

```js
function makeGreeter(name) {
  return function greet() {
    return `Hello, ${name}!`;
  };
}

const greetAda = makeGreeter("Ada");
console.log(greetAda()); // Hello, Ada!
```

`makeGreeter` has returned, but `greet` can still read `name`. The returned function and the lexical environment it can access form the closure.

### Closure intuition
Think of a function as carrying a reference to the surrounding variables it needs. It does not necessarily copy the values; it retains access to the bindings.

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Each call to `createCounter()` creates a separate environment:

```js
const first = createCounter();
const second = createCounter();

first(); // 1
first(); // 2
second(); // 1
```

## 3. Closures for private state

JavaScript does not require a class to encapsulate small pieces of state. A closure can keep a variable inaccessible directly from outside while exposing safe operations.

```js
function createWallet(initialBalance = 0) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Deposit must be a positive number");
      }
      balance += amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const wallet = createWallet(100);
wallet.deposit(25);
console.log(wallet.getBalance()); // 125
// wallet.balance is undefined
```

**Use cases:** counters, rate limiters, memoization caches, configuration factories, event handlers, and small stateful utilities.

## 4. Configurable functions with closures

A function can capture configuration once and use it on every call.

```js
function createDiscount(rate) {
  if (rate < 0 || rate > 1) {
    throw new Error("rate must be between 0 and 1");
  }

  return function applyDiscount(price) {
    return price * (1 - rate);
  };
}

const tenPercentOff = createDiscount(0.10);
const twentyPercentOff = createDiscount(0.20);

console.log(tenPercentOff(100)); // 90
console.log(twentyPercentOff(100)); // 80
```

This is useful when several functions share the same policy or settings. Validate configuration at creation time when possible.

## 5. Higher-order functions (HOFs)

A **higher-order function** is a function that does at least one of these:
- accepts one or more functions as arguments, or
- returns a function.

Functions are first-class values in JavaScript: they can be assigned to variables, passed to other functions, returned from functions, and stored in objects or arrays.

### A. Accepting a function

```js
function operate(a, b, operation) {
  return operation(a, b);
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log(operate(3, 4, add));      // 7
console.log(operate(3, 4, multiply)); // 12
```

Here `operate` is a higher-order function because it receives `operation`, a function.

### B. Returning a function

```js
function multiplyBy(factor) {
  return function (value) {
    return value * factor;
  };
}

const triple = multiplyBy(3);
console.log(triple(7)); // 21
```

This combines a higher-order function with a closure.

### C. Built-in examples

```js
const prices = [10, 20, 30];

const withTax = prices.map(price => price * 1.18);
const expensive = prices.filter(price => price >= 20);
const total = prices.reduce((sum, price) => sum + price, 0);

console.log(withTax);  // [11.8, 23.6, 35.4]
console.log(expensive); // [20, 30]
console.log(total);    // 60
```

`map`, `filter`, and `reduce` accept callback functions, so they are common higher-order functions.

## 6. Callbacks and function factories

A callback is a function passed to another function to be called later or at a chosen point.

```js
function runTask(taskName, onComplete) {
  console.log(`Running ${taskName}`);
  onComplete(taskName);
}

runTask("build", name => console.log(`${name} completed`));
```

A function factory produces functions with shared behavior or configuration:

```js
function createMinLengthValidator(minLength) {
  return value => typeof value === "string" && value.length >= minLength;
}

const isAtLeast8Chars = createMinLengthValidator(8);
console.log(isAtLeast8Chars("javascript")); // true
console.log(isAtLeast8Chars("hello"));      // false
```

## 7. Function composition

**Composition** combines small functions so the output of one becomes the input of the next. Small functions are easier to test and reuse.

```js
const trim = value => value.trim();
const toLowerCase = value => value.toLowerCase();
const addDomain = value => `${value}@example.com`;

const normalizeUsername = value => addDomain(toLowerCase(trim(value)));

console.log(normalizeUsername("  ADA  ")); // ada@example.com
```

### A reusable `pipe`

`pipe(f, g, h)(x)` runs left to right: `h(g(f(x)))`.

```js
const pipe = (...functions) => input =>
  functions.reduce((value, fn) => fn(value), input);

const normalize = pipe(
  value => value.trim(),
  value => value.toLowerCase(),
  value => value.replace(/\s+/g, "-")
);

console.log(normalize("  Hello World  ")); // hello-world
```

### `compose` versus `pipe`
- `pipe(f, g, h)(x)` applies `f`, then `g`, then `h`.
- `compose(f, g, h)(x)` conventionally applies `h`, then `g`, then `f`.

Be explicit about order when implementing these helpers; libraries can differ in naming conventions.

## 8. Pure functions

A **pure function**:
1. returns the same output for the same inputs, and
2. has no observable side effects.

```js
function addTax(price, taxRate) {
  return price * (1 + taxRate);
}
```

The result depends only on the arguments. By contrast:

```js
let taxRate = 0.18;

function addTaxImpure(price) {
  return price * (1 + taxRate); // depends on external mutable state
}
```

A function that writes to the console, modifies external state, updates the DOM, or sends a network request has a side effect. Side effects are often necessary, but keeping them at the edges of an application makes core logic easier to test.

### Benefits
- predictable output
- easy unit testing
- safer reuse and refactoring
- easier debugging
- fewer accidental interactions between features

## 9. Predictable state updates and immutability

Avoid mutating data that other parts of the program may be using. Return new arrays or objects when updating state.

```js
const user = { name: "Asha", points: 10 };

const updatedUser = {
  ...user,
  points: user.points + 5
};

console.log(user.points);        // 10
console.log(updatedUser.points); // 15
```

Array examples:

```js
const tasks = [
  { id: 1, title: "Read", done: false },
  { id: 2, title: "Practice", done: false }
];

const completedTasks = tasks.map(task =>
  task.id === 2 ? { ...task, done: true } : task
);

console.log(tasks[1].done);          // false
console.log(completedTasks[1].done); // true
```

Immutability does not automatically make every operation pure, but it reduces hidden state changes and makes updates easier to reason about.

## 10. Interview-oriented closure examples

### Example A: Output and shared binding

```js
function createFunctions() {
  let value = 0;
  return {
    increment: () => ++value,
    read: () => value
  };
}

const state = createFunctions();
console.log(state.read());      // 0
console.log(state.increment()); // 1
console.log(state.read());      // 1
```

Both returned functions close over the same `value` binding.

### Example B: Separate environments

```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}

const a = makeCounter();
const b = makeCounter();

console.log(a()); // 1
console.log(a()); // 2
console.log(b()); // 1
```

### Example C: `var` in a loop

```js
const callbacks = [];

for (var i = 0; i < 3; i++) {
  callbacks.push(() => console.log(i));
}

callbacks.forEach(fn => fn()); // 3, 3, 3
```

All callbacks close over the same function-scoped `i`, whose final value is `3`.

Using `let` creates a per-iteration binding:

```js
const callbacks = [];

for (let i = 0; i < 3; i++) {
  callbacks.push(() => console.log(i));
}

callbacks.forEach(fn => fn()); // 0, 1, 2
```

### Example D: Memoization

Memoization caches results so repeated calls with the same key can avoid repeated work.

```js
function memoizeUnary(fn) {
  const cache = new Map();

  return function (value) {
    if (cache.has(value)) return cache.get(value);

    const result = fn(value);
    cache.set(value, result);
    return result;
  };
}

const slowSquare = value => value * value;
const square = memoizeUnary(slowSquare);

console.log(square(5)); // computes and caches 25
console.log(square(5)); // returns cached 25
```

This simple version supports one argument and uses a `Map`; production memoization must define keying, cache size, and invalidation rules.

## 11. Common mistakes and best practices

- **Mistake:** Assuming a closure takes a snapshot of every variable.  
  **Correction:** It retains access to lexical bindings; mutable bindings can change.
- **Mistake:** Using a closure when a simple parameter would do.  
  **Correction:** Prefer the simplest design that communicates intent.
- **Mistake:** Hiding important shared state in many closures without documenting it.  
  **Correction:** Keep state ownership clear and expose narrow operations.
- **Mistake:** Ignoring memory retention.  
  **Correction:** Long-lived closures can keep referenced objects reachable; avoid retaining large data unnecessarily.
- **Mistake:** Assuming pure functions cannot use arrays or objects.  
  **Correction:** They can, provided they do not mutate shared input and their output depends only on inputs.
- **Mistake:** Treating all callbacks as asynchronous.  
  **Correction:** Callbacks can run synchronously or asynchronously.

## 12. Quick revision checklist

You should be able to explain:
- lexical scope and the scope chain
- what a closure retains and why it remains usable
- how closures provide private state and configuration
- both definitions of a higher-order function
- how `map`, `filter`, and `reduce` use callbacks
- how to compose functions with `pipe`
- pure functions, side effects, and immutability
- the `var` versus `let` loop-closure behavior
- practical limits of memoization and closure-based state
