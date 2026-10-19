# Important Theory Questions

1. What is DOM traversal and why is it useful?
2. What does parentElement return?
3. What is the difference between parentElement and parentNode?
4. What does the children property return?
5. How can you find the number of direct child elements?
6. What is closest() and how does it work?
7. How is closest() different from querySelector()?
8. Why is closest() useful in event delegation?
9. How can you combine closest(), classList, dataset, and remove()?
10. Explain how createElement() can be combined with append() to create dynamic UI.
11. Why should textContent generally be preferred for untrusted text?
12. Explain the difference between HTML attributes and DOM properties with examples.
13. How can classList.toggle() be used to manage visual state?
14. What is event bubbling and how does it help with interactive lists?
15. What is the purpose of event.target.closest(".selector")?
16. Why should rendering logic be separated from application data?
17. What is the difference between data, logic, and rendering?
18. Why can DocumentFragment be useful when creating many DOM elements?
19. What does replaceChildren() do?
20. Give a practical DOM debugging checklist.

# Important Practical Questions

1. Build an FAQ accordion using closest().
2. Create a profile card dynamically from an object.
3. Add a button that toggles a highlight class on the profile card.
4. Render a list of skills from an array.
5. Create a random quote generator from an array of quote objects.
6. Use event delegation to handle buttons inside dynamically created cards.
7. Add a data-id attribute to each dynamically generated item.
8. Remove a dynamically created card using closest() and remove().
9. Use parentElement and children to inspect a component.
10. Refactor a DOM script into separate data, logic, and rendering functions.

# Short Viva Questions

- What is an Element?
- What is a Node?
- What is an HTMLCollection?
- Is children the same as childNodes?
- Does closest() search downward or upward?
- Does closest() include the element on which it is called?
- What happens if closest() finds no match?
- What is event delegation?
- Why use data-* attributes?
- Why should DOM writes be kept organized?
