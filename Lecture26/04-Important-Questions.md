# Important Interview Questions: Browser Storage, Clean Code & Defensive Programming

## Browser storage

### 1. What is `localStorage`?
A synchronous string key/value store scoped to an origin that generally persists until removed or cleared.

### 2. What is `sessionStorage`?
A string key/value store scoped to an origin and a top-level browsing context, generally lasting for the page session.

### 3. What is the main difference between localStorage and sessionStorage?
`localStorage` is shared across same-origin tabs and persists longer; `sessionStorage` is normally isolated per tab/page session.

### 4. Can localStorage store objects directly?
No. Values are strings. Use `JSON.stringify()` to serialize and `JSON.parse()` to deserialize.

### 5. What does `getItem()` return when a key is missing?
`null`, not `undefined`.

### 6. Why should JSON parsing be guarded?
Saved content can be malformed or from an older schema; `JSON.parse()` throws on invalid JSON.

### 7. Is localStorage safe for passwords or tokens?
It is not a secure vault. Same-origin JavaScript can access it, so an XSS vulnerability may expose its contents. Avoid storing sensitive secrets there.

### 8. Can storage operations fail?
Yes. Browser policy, quota limits, or environment restrictions can cause failures. Handle them and communicate meaningful errors.

## Defaults and clean code

### 9. What is the difference between `||` and `??`?
`||` uses the fallback for any falsy value. `??` uses it only for `null` or `undefined`.

### 10. Do default parameters replace `null`?
No. A default parameter applies when the argument is omitted or `undefined`, not `null`.

### 11. What does single responsibility mean?
A function or module should have one cohesive purpose and one main reason to change.

### 12. Why use descriptive names?
They reveal intent, reduce mental overhead, and make code easier to review and maintain.

### 13. What is a guard clause?
An early check that returns or throws for invalid or special cases before the main logic.

### 14. Validation versus sanitization?
Validation checks whether input meets rules. Sanitization/normalization transforms input into an accepted form. Both must be appropriate to the context.

### 15. Why use `textContent` rather than `innerHTML` for user input?
`textContent` inserts text rather than parsing it as HTML, reducing HTML injection risk.

### 16. What makes a good comment?
It explains why a non-obvious choice, constraint, or workaround exists rather than narrating obvious syntax.

### 17. Why prefer immutable state updates?
They reduce accidental shared mutations and make changes easier to track and test.

### 18. Should every function be very short?
No. Functions should be cohesive and understandable. Splitting code is useful when it clarifies responsibilities, not merely to hit a line count.

## Output questions

### Q1
```js
console.log(0 || 10);
console.log(0 ?? 10);
```
**Answer:** `10`, then `0`.

### Q2
```js
function greet(name = "Guest") {
  return name;
}
console.log(greet(undefined));
console.log(greet(null));
```
**Answer:** `Guest`, then `null`.

### Q3
```js
const raw = null;
console.log(raw === null ? [] : JSON.parse(raw));
```
**Answer:** `[]`. The missing value is handled before parsing.

### Q4
```js
const original = [{ id: 1, done: false }];
const updated = original.map(item =>
  item.id === 1 ? { ...item, done: true } : item
);
console.log(original[0].done, updated[0].done);
```
**Answer:** `false true`. The original item is not mutated.

## Coding exercises
1. Implement `readJson(storage, key, fallback)` safely.
2. Explain the difference between `||` and `??` with examples using `0`, `false`, and `""`.
3. Refactor a function that validates, saves, renders, and logs into focused functions.
4. Write a title normalizer that trims whitespace and enforces a length limit.
5. Replace unsafe `innerHTML` rendering with safe DOM APIs.
6. Build an immutable function that completes a task by ID.
7. Write a tracker audit report listing at least six issues and their fixes.
8. Explain when a storage failure should be surfaced rather than silently ignored.
