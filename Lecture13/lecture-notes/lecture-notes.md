# Lecture Notes: Classes, Inline Styles & Visual State

## 1. className vs classList

### className
`className` represents the complete value of an element's class attribute.

```js
const card = document.querySelector(".card");
console.log(card.className);

card.className = "card active";
```

Be careful: assigning `className` replaces all existing classes.

### classList
`classList` provides a DOMTokenList for individual classes.

```js
card.classList.add("active");
card.classList.remove("active");
card.classList.toggle("active");
console.log(card.classList.contains("active"));
card.classList.replace("active", "selected");
```

For state changes, `classList` is usually safer and clearer.

## 2. Core classList methods

- `add()` — add one or more classes.
- `remove()` — remove one or more classes.
- `toggle()` — add if absent, remove if present.
- `contains()` — test whether a class exists.
- `replace(old, new)` — replace one class with another.

Example:

```js
button.addEventListener("click", () => {
  card.classList.toggle("selected");
});
```

## 3. Read and set style properties

Inline style:

```js
box.style.backgroundColor = "tomato";
box.style.padding = "20px";

console.log(box.style.backgroundColor);
```

Important: `element.style` primarily exposes inline styles.

For the final computed value after CSS rules have been applied:

```js
const styles = getComputedStyle(box);
console.log(styles.backgroundColor);
```

Use JavaScript inline styles mainly when the value itself is dynamic, for example a progress width:

```js
progress.style.width = `${percentage}%`;
```

## 4. CSS classes as the preferred state mechanism

Instead of:

```js
card.style.backgroundColor = "green";
card.style.borderColor = "green";
card.style.transform = "scale(1.02)";
```

Prefer:

```js
card.classList.add("is-success");
```

CSS:

```css
.card.is-success {
  background: #e8f5e9;
  border-color: green;
}
```

Benefits:
- presentation stays in CSS
- JavaScript controls behavior/state
- styles are reusable
- easier maintenance
- responsive rules remain in CSS

## 5. Show/Hide Patterns

Simple CSS state:

```css
.panel.is-hidden {
  display: none;
}
```

JavaScript:

```js
panel.classList.toggle("is-hidden");
```

For semantic hiding of content, the HTML `hidden` property is often useful:

```js
panel.hidden = true;
panel.hidden = false;
```

For interactive disclosure controls, keep accessibility state synchronized:

```html
<button aria-expanded="false" aria-controls="details">
  Show details
</button>
<div id="details" hidden>Details...</div>
```

JavaScript should update both:

```js
button.setAttribute("aria-expanded", "true");
details.hidden = false;
```

## 6. Theme Switching Architecture

A clean architecture is:

1. JavaScript changes one state class on `body`.
2. CSS custom properties define theme values.
3. Components consume those variables.
4. Optional `localStorage` remembers the user's choice.

Example:

```css
:root {
  --bg: white;
  --text: black;
}

body.dark {
  --bg: #111;
  --text: white;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

JavaScript:

```js
document.body.classList.toggle("dark");
```

This keeps theme logic simple and centralizes visual decisions in CSS.

## 7. Common Mistakes

### Mistake 1: Replacing unrelated classes

```js
card.className = "active";
```

This may remove required classes.

Prefer:

```js
card.classList.add("active");
```

### Mistake 2: Using inline styles for every state

Avoid putting large visual rules into JavaScript. Use state classes.

### Mistake 3: Visual hiding without accessibility state

If a button opens content, keep `aria-expanded` accurate.

### Mistake 4: Forgetting keyboard focus

Use `:focus-visible` styles so keyboard users can see where focus is.

## 8. Key Takeaway

JavaScript should generally manage UI state; CSS should manage the appearance of that state. `classList` is the main bridge between the two.




Final Takeaway

"Aaj ka sabse important concept ek line mein yaad rakho:

JavaScript state manage karegi, CSS appearance manage karegi.

className poore class attribute ke saath kaam karta hai.

classList individual classes ko add, remove, toggle, check aur replace karne ke liye use hota hai.

style se JavaScript directly inline CSS change kar sakti hai, lekin large visual states ke liye CSS classes generally cleaner approach hain.

Show/hide ke liye classList ya hidden property use kar sakte hain.

Aur agar koi interactive content open/close ho raha hai, to accessibility state jaise aria-expanded ko bhi synchronize karna chahiye.

Isliye practical rule:

JS → State / Behavior

CSS → Appearance

HTML → Structure
"
