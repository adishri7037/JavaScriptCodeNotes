# Propagation, Bubbling & Delegation

## 1. Learning Objectives
- Explain how an event travels through the DOM.
- Distinguish capturing, target, and bubbling phases.
- Use `stopPropagation()` carefully.
- Explain why event delegation works.
- Handle events for dynamically created elements.
- Debug event flow using `target`, `currentTarget`, and `eventPhase`.

---

## 2. Event Propagation

When an event occurs on an element, the browser processes the event through the DOM tree.

Example:

```html
<div id="card">
  <button id="saveBtn">Save</button>
</div>
```

Clicking the button involves these conceptual stages:

1. Capturing phase: event travels from the document toward the target.
2. Target phase: event reaches the button.
3. Bubbling phase: event travels back upward through ancestors.

Typical flow:

```text
document
   ↓
html
   ↓
body
   ↓
div#card
   ↓
button#saveBtn   ← target
   ↑
div#card
   ↑
body
   ↑
html
   ↑
document
```
Not every event bubbles. Always check the event's behavior when relying on bubbling.
---

## 3. Capturing vs Bubbling

A listener normally runs during the bubbling phase.

```js
element.addEventListener("click", handler);
```

A capturing listener can be registered with the third argument or an options object:

```js
element.addEventListener("click", handler, true);

// Equivalent style:
element.addEventListener("click", handler, { capture: true });
```

Example:

```js
const outer = document.querySelector(".outer");
const inner = document.querySelector(".inner");

outer.addEventListener("click", () => {
  console.log("outer - bubble");
});

outer.addEventListener("click", () => {
  console.log("outer - capture");
}, { capture: true });

inner.addEventListener("click", () => {
  console.log("inner");
});
```

When `.inner` is clicked, the capture listener on `.outer` runs before the target listener, while the normal listener on `.outer` runs during bubbling.

---

## 4. Bubbling

Bubbling means an event triggered on a child can reach its ancestors.

```html
<div id="parent">
  <button id="child">Click</button>
</div>
```

```js
parent.addEventListener("click", () => {
  console.log("Parent received the click");
});

child.addEventListener("click", () => {
  console.log("Button clicked");
});
```

Clicking the button normally logs:

```text
Button clicked
Parent received the click
```

This behavior is the foundation of event delegation.

---

## 5. `event.target` vs `event.currentTarget`

### `event.target`
The actual element where the event originated.

### `event.currentTarget`
The element whose event listener is currently executing.

Example:

```js
document.querySelector("#list").addEventListener("click", (event) => {
  console.log("target:", event.target);
  console.log("currentTarget:", event.currentTarget);
});
```

If the user clicks a button inside `#list`:

```text
target        → button
currentTarget → #list
```

This distinction is essential for event delegation.

---

## 6. `stopPropagation()`

`stopPropagation()` prevents the event from continuing to another phase/ancestor.

```js
button.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("Button only");
});
```

If a parent also has a click listener, the event will not continue to that parent.

### Important: do not use it by default

`stopPropagation()` can make applications harder to understand because other components may legitimately depend on the same event.

Avoid using it simply because a parent listener is firing.

Prefer:
- More specific selectors.
- Event delegation with clear target checks.
- `stopPropagation()` only when you intentionally need to isolate an interaction.

### `stopPropagation()` vs `stopImmediatePropagation()`

`stopPropagation()` stops the event from moving to other elements.

`stopImmediatePropagation()` additionally prevents other listeners on the same element from running.

Use the stronger method only when there is a specific reason.

---

## 7. Event Delegation

Event delegation means placing one listener on a common ancestor instead of attaching separate listeners to every child.

Instead of:

```js
document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", deleteTask);
});
```

Use:

```js
const list = document.querySelector("#taskList");

list.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-btn");

  if (!button) return;

  deleteTask(button);
});
```

The parent handles events that bubble from its children.

---

## 8. Why Delegation Helps

### Dynamic elements

Suppose tasks are added after the page loads:

```js
list.insertAdjacentHTML(
  "beforeend",
  '<li><button class="delete-btn">Delete</button></li>'
);
```

A delegated listener on `list` can handle the new button automatically.

You do not need to attach another listener to every new button.

### Performance

For a large list:

```text
1000 buttons
→ 1000 individual listeners
```

Delegation can use:

```text
1 parent listener
```

The exact performance benefit depends on the application, DOM size, event frequency, and browser behavior. The larger maintainability benefit is often more important.

### Maintainability

Delegation centralizes related event handling:

```js
list.addEventListener("click", handleListClick);
```

The handler can manage actions such as:
- complete
- delete
- vote
- edit
- select

---

## 9. `closest()` and Delegation

`closest()` is particularly useful when the user clicks an element inside a button.

Example:

```html
<button class="delete-btn">
  <span>Delete</span>
</button>
```

The target might be the `<span>`, not the button.

This works:

```js
const button = event.target.closest(".delete-btn");
```

Then protect against a match outside the intended container:

```js
if (!button || !list.contains(button)) return;
```

---

## 10. Delegation for Dynamic Lists

A robust pattern:

```js
list.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");

  if (!actionButton || !list.contains(actionButton)) {
    return;
  }

  const action = actionButton.dataset.action;
  const item = actionButton.closest("[data-id]");

  if (!item) return;

  console.log({
    action,
    id: item.dataset.id
  });
});
```

This pattern separates:
- event detection
- target identification
- action selection
- data identification

---

## 11. Data Attributes

HTML:

```html
<li data-id="101">
  <span>Learn JavaScript</span>
  <button data-action="complete">Complete</button>
  <button data-action="delete">Delete</button>
</li>
```

JavaScript:

```js
const item = button.closest("[data-id]");
const id = item.dataset.id;
```

`data-*` attributes are useful for connecting DOM elements to application data.

---

## 12. Debugging Event Flow

Useful properties:

```js
console.log("type:", event.type);
console.log("target:", event.target);
console.log("currentTarget:", event.currentTarget);
console.log("eventPhase:", event.eventPhase);
console.log("bubbles:", event.bubbles);
```

`eventPhase` values:

```text
1 → CAPTURING_PHASE
2 → AT_TARGET
3 → BUBBLING_PHASE
```

Useful debugging questions:

1. Which element generated the event?
2. Which element's listener is running?
3. Is the event bubbling?
4. Is a capturing listener involved?
5. Is `stopPropagation()` being called?
6. Is the selected target inside the intended container?
7. Is a dynamically created element being handled by delegation?

---

## 13. Common Mistakes

### Mistake 1: Calling the handler immediately

Wrong:

```js
button.addEventListener("click", handleClick());
```

Correct:

```js
button.addEventListener("click", handleClick);
```

### Mistake 2: Assuming `target` is always the button

If a button contains an icon:

```html
<button class="delete-btn">
  <span>×</span>
</button>
```

The target may be the `<span>`.

Use:

```js
event.target.closest(".delete-btn");
```

### Mistake 3: Delegating from the wrong ancestor

The delegated listener must be on an ancestor through which the event bubbles.

### Mistake 4: Overusing `stopPropagation()`

Do not use it as a general solution for unwanted behavior.

### Mistake 5: Forgetting containment checks

Use:

```js
if (!button || !list.contains(button)) return;
```

when appropriate.

---

## 14. Recommended Delegation Pattern

```js
const container = document.querySelector("#container");

container.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");

  if (!control || !container.contains(control)) {
    return;
  }

  const item = control.closest("[data-id]");

  if (!item) {
    return;
  }

  const action = control.dataset.action;
  const id = item.dataset.id;

  if (action === "delete") {
    // delete item
  }

  if (action === "complete") {
    // complete item
  }
});
```

This is a practical foundation for dynamic UI components.
