# Important Questions — Event Listeners & Event Object

## Theory Questions

1. What is an event in JavaScript?
2. What is the purpose of `addEventListener()`?
3. What is the difference between an event handler function and an event listener?
4. Why should we write `addEventListener("click", handleClick)` instead of `addEventListener("click", handleClick())`?
5. Explain the difference between `click`, `input`, `change`, and `submit` events.
6. What is the event object? Why is it useful?
7. What is the difference between `event.target` and `event.currentTarget`?
8. What are keyboard events? Differentiate `keydown` and `keyup`.
9. How can multiple listeners be attached to the same element and event?
10. What is the difference between `onclick` and `addEventListener()`?
11. What is default browser behavior? Give examples.
12. What does `event.preventDefault()` do?
13. Why is `preventDefault()` commonly used with form submission?
14. Explain how to pass custom arguments to an event handler.
15. What is the difference between `event.target.value` and directly selecting an input element?
16. Why are event listeners useful for interactive web pages?
17. What information can commonly be inspected from a MouseEvent or KeyboardEvent?
18. What happens if the same function is registered twice with `addEventListener()`?
19. Why should event handlers usually be kept small and focused?
20. How can browser DevTools help debug event-related problems?

## Practical / Coding Questions

1. Create a button that increases a counter every time it is clicked.
2. Create a decrease and reset button for the same counter.
3. Create an input field that displays its current value live using the `input` event.
4. Create a select menu and display the selected option using `change`.
5. Create a form and prevent its default submission using `preventDefault()`.
6. Display the pressed keyboard key using `keydown`.
7. Create a button with two separate click listeners that perform different tasks.
8. Build a like button that increments a like count.
9. Create a keyboard interaction where ArrowUp and ArrowDown update a status message.
10. Explain and fix this code:
   `button.addEventListener("click", greet("Aditya"));`
11. Build a small calculator button using an event listener and a wrapper function for arguments.
12. Use `event.target` to determine which button inside a list was clicked.
13. Use `event.currentTarget` to update the button that owns a listener.
14. Prevent the Space key from scrolling the page in a specific interactive area.
15. Build a mini keyboard-controlled counter using `+`, `-`, and `r` keys.

## Interview Ques
- Why is `addEventListener()` generally preferred over inline event attributes?
- Can an event listener receive arguments?
- What is the role of the event object?
- When does `change` behave differently from `input`?
- Why does a form submission reload the page by default?
- What is the difference between `event.target` and `event.currentTarget`?
- How would you debug a listener that does not fire?
