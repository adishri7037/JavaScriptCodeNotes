# 10 Important Questions — Theory + Practical

## Theory Questions

1. Explain the difference between element.className and element.classList. When would you prefer each?
2. Explain classList.add(), remove(), toggle(), contains() and replace() with examples.
3. What is the difference between changing a CSS class and setting an inline style through element.style?
4. Why are CSS classes generally preferred for reusable visual states such as active, open, error and dark?
5. How can you read an inline style using element.style? How is this different from getComputedStyle()?
6. Explain accessible show/hide patterns. Why are aria-expanded, aria-controls, and the HTML hidden attribute useful?
7. What are the advantages of CSS custom properties (--variable) in a theme-switching architecture?

## Practical Questions

8. Build a button that toggles an active class on a card and displays whether the class is currently present.
9. Build an FAQ accordion using classList.toggle() or hidden, while keeping aria-expanded synchronized with the visual state.
10. Build a light/dark theme switcher. Store the selected theme in localStorage and restore it when the page reloads.

## Viva Follow-up Questions
- What does classList.toggle("dark") return?
- Can one element have multiple classes?
- What happens if classList.add() receives a class that already exists?
- Why should you avoid using innerHTML just to change a visual state?
- When is an inline style appropriate?
