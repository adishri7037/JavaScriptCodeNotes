
# Event Listeners & Event Object in JavaScript

## 1\. What Is an Event?

An **event** is a signal that something has happened in the browser.

Events can be triggered by user actions or browser activities.

### Examples of Events

- Clicking a button
- Typing something into an input field
- Submitting a form
- Pressing a keyboard key
- Moving the mouse over an element

**In simple words:** Event ka matlab hai browser mein koi action ya activity hona.

### Example

HTMLWrap linesCopy codePreview

```
<button id="myButton">Click Me</button>
```

When the user clicks the button, a `click` event occurs.

---

## 2\. What Is `addEventListener()`?

`addEventListener()` is a JavaScript method used to listen for a specific event on an HTML element and execute a function when that event occurs.

**In simple words:** Event listener ek mechanism hai jo kisi particular event ko listen ya watch karta hai.

### Syntax

```
element.addEventListener("eventName", handlerFunction);
```

- `element`: The HTML element on which the event should be listened for.
- `"eventName"`: The type of event to listen for, such as `"click"` or `"input"`.
- `handlerFunction`: The function that should execute when the event occurs.

### Example

HTMLWrap linesCopy codePreview

```
<button id="myButton">Click Me</button>

<script>
  const button = document.querySelector("#myButton");

  function handleClick() {
    console.log("Button clicked!");
  }

  button.addEventListener("click", handleClick);
</script>
```

### How Does It Work?

1. The browser loads the page.
2. JavaScript selects the button.
3. `addEventListener()` registers the event listener.
4. The user clicks the button.
5. The browser triggers the `click` event.
6. The `handleClick` function executes.
7. `"Button clicked!"` appears in the console.

### What Is a Handler Function?

A **handler function** (also called an event handler) is a function that executes in response to an event.

```
function handleClick() {
  console.log("Button clicked!");
}
```

Here, `handleClick` is the handler function.

**Important:** Pass the function reference without parentheses when registering the listener.

```
// Correct: Pass the function reference
button.addEventListener("click", handleClick);

// Incorrect: Calls the function immediately
button.addEventListener("click", handleClick());
```

The incorrect version invokes `handleClick()` during registration instead of waiting for the click. Its return value is then passed to `addEventListener()`.

---

## 3\. Common JavaScript Events

| Event | Explanation | Example use case |
| --- | --- | --- |
| `click` | Occurs when an element is clicked. | Button click |
| `dblclick` | Occurs when an element is double-clicked. | Opening an item |
| `input` | Occurs when a form control's value is edited. | Live search |
| `change` | Occurs when a control's value is committed. | Selecting a country |
| `submit` | Occurs when a form is submitted. | Form validation |
| `keydown` | Occurs when a keyboard key is pressed. | Detecting Enter |
| `keyup` | Occurs when a keyboard key is released. | Tracking released keys |
| `mouseover` | Occurs when the pointer enters an element or one of its descendants. | Hover effects |
| `focus` | Occurs when an element receives focus. | Highlighting an input |
| `blur` | Occurs when an element loses focus. | Checking an input after leaving it |

### Example: `click` Event

```
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

### Example: `input` Event

HTMLWrap linesCopy codePreview

```
<input id="username" placeholder="Enter your name" />

<script>
  const input = document.querySelector("#username");

  input.addEventListener("input", (event) => {
    console.log(event.target.value);
  });
</script>
```

Whenever the user edits the input, its current value is printed.

### Difference Between `input` and `change`

- `input`: Fires as the value is edited.
- `change`: Fires when the value is committed. For a text input, this commonly happens after editing and then moving focus away. For a checkbox or select, it generally fires when the selection changes.

---

## 4\. What Is the Event Object?

When an event occurs, the browser creates an **event object** containing information about that event and passes it to the event listener.

In simple words, browser event ke baare mein information provide karta hai, jaise:

- Kaunsa event hua?
- Event kis element par originate hua?
- Kaunsa listener execute ho raha hai?
- Keyboard par kaunsi key press hui?
- Mouse ki position kya thi?

### Syntax

```
element.addEventListener("click", (event) => {
  console.log(event);
});
```

Here, `event` is a parameter that receives the event object.

The parameter name can be different, but `event` and `e` are common conventions.

```
button.addEventListener("click", (e) => {
  console.log(e.type);
});
```

### Useful Event Object Properties

| Property | Meaning |
| --- | --- |
| `event.type` | Type of event, such as `"click"` |
| `event.target` | Element where the event originated |
| `event.currentTarget` | Element whose listener is currently executing |
| `event.key` | Keyboard key value, such as `"Enter"` or `"a"` |
| `event.code` | Physical keyboard key identifier, such as `"Enter"` or `"KeyA"` |
| `event.clientX` | Mouse pointer's horizontal position relative to the viewport |
| `event.clientY` | Mouse pointer's vertical position relative to the viewport |
| `event.preventDefault()` | Prevents the browser's default action when the event is cancelable |

### Example

HTMLWrap linesCopy codePreview

```
<button id="myButton">Click Me</button>

<script>
  const button = document.querySelector("#myButton");

  button.addEventListener("click", (event) => {
    console.log("Event type:", event.type);
    console.log("Target:", event.target);
    console.log("Current target:", event.currentTarget);
  });
</script>
```

When the button is clicked, the console displays the event type and the relevant elements.

---

## 5\. Difference Between `target` and `currentTarget`

This is one of the most important concepts in event handling.

### `event.target`

The element where the event originated.

### `event.currentTarget`

The element on which the currently executing event listener is registered.

**In simple words:**

- `target` = Event originally kis element se aaya?
- `currentTarget` = Abhi jis element ka listener execute ho raha hai, woh kaunsa hai?

### Example

HTMLWrap linesCopy codePreview

```
<div id="parent">
  Parent
  <button id="child">Click Me</button>
</div>

<script>
  const parent = document.querySelector("#parent");

  parent.addEventListener("click", (event) => {
    console.log("Target:", event.target);
    console.log("Current target:", event.currentTarget);
  });
</script>
```

Suppose the user clicks the button.

- `event.target` refers to the button.
- `event.currentTarget` refers to the parent `div`.

Why? The click originated on the button, but the listener is registered on the parent.

This happens because many browser events **bubble** from a child element to its ancestors.

### Important Note

If you click directly on the parent `div` instead of the button, both `target` and `currentTarget` refer to the parent.

---

## 6\. Passing Arguments to a Handler Function

Sometimes, you want to pass custom arguments to a handler function.

### Example: Function With an Argument

```
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

We want to call `greet("Aman")` when the button is clicked.

### Incorrect Approach

```
button.addEventListener("click", greet("Aman"));
```

**Why is this incorrect?**

JavaScript immediately executes `greet("Aman")` while registering the listener. The return value of `greet()` is passed to `addEventListener()`, not the function itself.

### Correct Approach: Use a Wrapper Function

```
button.addEventListener("click", () => {
  greet("Aman");
});
```

Or, more concisely:

```
button.addEventListener("click", () => greet("Aman"));
```

The arrow function acts as a wrapper. It delays the call to `greet("Aman")` until the click event occurs.

### Execution Flow

1. Page loads.
2. Event listener is registered.
3. Nothing happens yet.
4. User clicks the button.
5. The arrow function executes.
6. `greet("Aman")` executes.
7. `"Hello, Aman!"` is printed.

**Remember:**

```
// Pass a function reference
button.addEventListener("click", greet);

// Use a wrapper when you need arguments
button.addEventListener("click", () => greet("Aman"));
```

---

## 7\. Multiple Event Listeners on the Same Element

You can attach multiple event listeners to the same element and event type.

This helps separate different responsibilities into different functions.

### Example

HTMLWrap linesCopy codePreview

```
<button id="myButton">Click Me</button>

<script>
  const button = document.querySelector("#myButton");

  button.addEventListener("click", () => {
    console.log("Button was clicked.");
  });

  button.addEventListener("click", () => {
    console.log("Another listener executed.");
  });
</script>
```

### Output on One Click

```
Button was clicked.
Another listener executed.
```

Both listeners execute when the button is clicked.

**Important:** Separate listeners are useful when different parts of your code need to respond independently to the same event. However, their execution order and interactions can matter when one listener modifies the page or the event.

---

## 8\. Default Browser Behavior and `preventDefault()`

Browsers provide built-in behavior for certain actions.

### Examples

- Clicking a link navigates to another URL.
- Submitting a form may navigate to another page or reload the current page.
- Pressing Space can scroll the page in some contexts.

Sometimes, you want to handle the action using JavaScript instead of allowing the browser's default behavior.

For this, use `event.preventDefault()`.

### Example: Preventing Form Submission

HTMLWrap linesCopy codePreview

```
<form id="myForm">
  <input type="text" placeholder="Enter your name" />
  <button type="submit">Submit</button>
</form>

<script>
  const form = document.querySelector("#myForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Form handled using JavaScript.");
  });
</script>
```

When the form is submitted:

1. The `submit` event occurs.
2. The event listener executes.
3. `preventDefault()` cancels the browser's normal form-submission behavior.
4. The JavaScript code runs without the usual form navigation or reload.

### Important Difference

`preventDefault()` does **not** stop event propagation. It prevents the default browser action when that action is cancelable.

To stop an event from bubbling to ancestor elements, use `event.stopPropagation()` when needed.

Use these methods only when your application needs to change the normal behavior.

---

## 9\. Keyboard Events: `keydown`, `keyup`, `key`, and `code`

Keyboard events allow JavaScript to respond to keyboard activity.

### Example: Detecting the Enter Key

HTMLWrap linesCopy codePreview

```
<input id="message" placeholder="Type something and press Enter" />

<script>
  const input = document.querySelector("#message");

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed!");
    }
  });
</script>
```

### Difference Between `key` and `code`

- `event.key`: Represents the key's value or meaning, depending on the keyboard layout and modifier keys. For example, `"a"` or `"Enter"`.
- `event.code`: Identifies the physical key position using a standard code. For example, `"KeyA"` or `"Enter"`.

```
document.addEventListener("keydown", (event) => {
  console.log("Key:", event.key);
  console.log("Code:", event.code);
});
```

For ordinary keyboard input, `event.key` is usually the better choice. Use `event.code` when the physical key position matters.

---

## 10\. Mouse Coordinates: `clientX` and `clientY`

The event object can provide the mouse pointer's coordinates relative to the browser's viewport.

- `clientX`: Horizontal coordinate.
- `clientY`: Vertical coordinate.

### Example

HTMLWrap linesCopy codePreview

```
<button id="myButton">Click Anywhere</button>

<script>
  const button = document.querySelector("#myButton");

  button.addEventListener("click", (event) => {
    console.log("X:", event.clientX);
    console.log("Y:", event.clientY);
  });
</script>
```

When the button is clicked, the console displays the pointer's position relative to the visible viewport.

**Note:** These values are not document coordinates. Scrolling does not get added to `clientX` or `clientY`.

---

## 11\. Quick Revision

| Concept | Remember |
| --- | --- |
| Event | Something that happens in the browser |
| Event listener | Watches for a particular event |
| Handler function | Runs in response to an event |
| `addEventListener()` | Registers an event listener |
| Event object | Contains information about an event |
| `event.target` | Where the event originated |
| `event.currentTarget` | Element whose listener is executing |
| `event.key` | Keyboard key value |
| `event.code` | Physical key identifier |
| `event.preventDefault()` | Prevents the default browser action when cancelable |
| `event.stopPropagation()` | Stops further propagation of the event |

### Most Important Rule

```
// Correct: Wait for the click
button.addEventListener("click", handleClick);

// Correct: Pass an argument using a wrapper
button.addEventListener("click", () => greet("Aman"));

// Incorrect: Invokes the function immediately
button.addEventListener("click", handleClick());
```

**Final takeaway:** `addEventListener()` connects an event to a handler function, and the event object provides information about what happened and where it happened.