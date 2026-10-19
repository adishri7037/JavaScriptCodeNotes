# Important Questions: Propagation, Bubbling & Delegation

## Theory Questions

1. What is event propagation in JavaScript?
2. Explain the capturing, target, and bubbling phases.
3. What is event bubbling? Give a practical example.
4. What is the difference between `event.target` and `event.currentTarget`?
5. How can a listener be registered for the capturing phase?
6. What does `stopPropagation()` do?
7. Why should `stopPropagation()` not be used unnecessarily?
8. Differentiate `stopPropagation()` and `stopImmediatePropagation()`.
9. What is event delegation?
10. Why does event delegation work for dynamically created elements?
11. What are the performance benefits of event delegation?
12. What are the maintainability benefits of event delegation?
13. Why is `closest()` useful when implementing delegation?
14. What role do `data-*` attributes play in delegated event handlers?
15. What is `eventPhase` and what do values 1, 2, and 3 represent?
16. Why should a delegated handler verify that the matched element belongs to the intended container?
17. Give an example where many individual listeners could be replaced with one delegated listener.
18. What happens if an event does not bubble?
19. What is the difference between a capturing listener and a bubbling listener?
20. How would you debug a click event that appears to be firing on the wrong element?

## Practical / Coding Questions

1. Build a list where one delegated listener handles Delete buttons.
2. Create a dynamic task list with Add, Complete, and Delete actions.
3. Build a voting list where one delegated listener handles all Vote buttons.
4. Use `closest()` to correctly identify a button when the user clicks a nested `<span>`.
5. Add `data-id` and `data-action` attributes to a dynamic list.
6. Log `target`, `currentTarget`, `eventPhase`, and `bubbles` for a click.
7. Demonstrate bubbling using nested `<div>` elements.
8. Demonstrate the difference between capturing and bubbling.
9. Add `stopPropagation()` and explain the change in event flow.
10. Refactor a solution containing 100 individual button listeners into one delegated listener.

## Viva / Interview Questions

1. Why is event delegation considered an example of using event bubbling?
2. If `event.target` is a child `<span>` inside a button, how do you find the button?
3. Does event delegation require the child elements to exist when the listener is attached?
4. What problem can excessive use of `stopPropagation()` create in a large application?
5. Why is one delegated listener often easier to maintain than many child listeners?
