# Important Interview Questions: Closures, HOFs & Functional Patterns

## Core questions and answers

### 1. What is lexical scope?
Variable visibility is determined by where functions and blocks are written in source code. JavaScript resolves names through the lexical scope chain.

### 2. What is a closure?
A function together with its retained access to the lexical environment in which it was created. It can access outer bindings after the outer function returns.

### 3. Why are closures useful?
They support private state, configurable function factories, callbacks, memoization, and encapsulation without exposing internal variables.

### 4. Does a closure copy the outer variable's value?
Not generally. It retains access to the binding. If the binding changes, a closure that reads it later can observe the new value.

### 5. What is a private counter?
A function factory that stores `count` in a local variable and returns methods that can read or update it. The variable is not directly accessible from outside.

### 6. What is a higher-order function?
A function that accepts a function as an argument, returns a function, or does both.

### 7. Are `map`, `filter`, and `reduce` higher-order functions?
Yes. They accept callbacks to transform, select, or accumulate array values.

### 8. What is a function factory?
A function that returns another function, often configured with values captured in a closure.

### 9. What is function composition?
Combining functions so the output of one becomes the input of another. It encourages small, reusable transformations.

### 10. What is the difference between `pipe` and `compose`?
Commonly, `pipe` applies functions left to right, while `compose` applies them right to left. Check the convention used by a particular library.

### 11. What is a pure function?
A function that produces the same result for the same inputs and has no observable side effects.

### 12. What is a side effect?
An observable interaction beyond returning a value, such as mutating shared state, writing to a file, updating the DOM, logging, or making a network request.

### 13. Why prefer immutable updates?
They avoid modifying shared objects in place, making state changes easier to track, test, and reason about.

### 14. Why does a `var` loop sometimes print the same final value from every callback?
`var` is function-scoped, so callbacks close over the same binding. By the time they run, the loop has finished. `let` creates a per-iteration binding.

### 15. Can closures cause memory issues?
Potentially. Long-lived closures can keep referenced objects reachable. Release references and avoid capturing large objects unnecessarily.

### 16. Is every callback asynchronous?
No. A callback may be invoked immediately (synchronously) or later (asynchronously).

### 17. How does memoization use closures?
A wrapper function closes over a cache and uses it to store and reuse prior results.

### 18. What should be considered when implementing memoization?
Input key strategy, multiple arguments, object identity, cache size, invalidation, side effects, and whether the function is safe to cache.

### 19. Are closures a replacement for classes?
Not always. Closures are good for focused private state and factories; classes can be clearer for many instances with shared methods and inheritance-like structures.

### 20. How would you test a closure-based counter?
Check the initial value, increment/decrement behavior, reset behavior, independence of two counters, and the absence of direct access to internal state.

## Output-prediction questions

### Q1
```js
function outer() {
  let x = 10;
  return () => ++x;
}
const fn = outer();
console.log(fn());
console.log(fn());
```
**Answer:** `11`, then `12`. The returned function retains the same `x` binding.

### Q2
```js
function make() {
  let x = 1;
  return () => x;
}
const a = make();
const b = make();
console.log(a(), b());
```
**Answer:** `1 1`. Each call to `make` creates a separate lexical environment.

### Q3
```js
const double = n => n * 2;
const addOne = n => n + 1;
const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x);
console.log(pipe(double, addOne)(3));
```
**Answer:** `7`: `3 → 6 → 7`.

### Q4
```js
let outside = 2;
const read = () => outside;
outside = 9;
console.log(read());
```
**Answer:** `9`. The closure reads the current value of the captured binding when invoked.

## Coding exercises
1. Create a counter with `increment`, `decrement`, `reset`, and `getValue`.
2. Create a `minLength(n)` validator factory.
3. Implement `pipe(...functions)`.
4. Write a pure function that returns a new array with one item updated by ID.
5. Implement a memoizer for one-argument pure functions.
6. Explain and fix the `var` loop closure example.
7. Create a configurable logger that captures a prefix.
8. Write a validator factory supporting required, length, and pattern rules.
