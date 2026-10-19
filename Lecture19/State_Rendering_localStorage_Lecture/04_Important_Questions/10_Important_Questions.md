# 10 Important Questions — State, Rendering & localStorage

## Theory Questions

1. What is application state in JavaScript? Explain with an example using an array of objects.

2. Why is state-driven rendering generally easier to maintain than manually changing many DOM elements?

3. What is the difference between `JSON.stringify()` and `JSON.parse()`? Give one use case for each.

4. Explain how `localStorage.setItem()`, `getItem()`, `removeItem()` and `clear()` work.

5. Why can an object or array not be directly stored in localStorage as structured JavaScript data? Explain the role of JSON.

6. What are initialization, default state and empty-state UI? Why are they important in a browser application?

7. What is a schema default? How can an application safely handle saved data that is missing expected properties?

8. Why should localStorage not be used for passwords, secret keys or other sensitive information? Mention other important limitations.

## Practical / Coding Questions

9. Build a task list where the state is an array of objects. Add, delete and toggle tasks, then render the complete list from state after each action.

10. Modify the task manager so that tasks survive a browser refresh. Use `JSON.stringify()` while saving and `JSON.parse()` while loading. Also handle invalid saved JSON and show an empty state when there are no tasks.

## Viva Follow-up Questions

- What happens when `localStorage.getItem()` is called for a missing key?
- Why should storage code use `try...catch`?
- What is the difference between DOM, state and persistent storage?
- What does `localStorage.clear()` affect?
- Why is rendering from state useful when data changes?
