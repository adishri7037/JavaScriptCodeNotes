# Content, Attributes & Safe Updates — DOM
textContent
innerHTML
getAttribute()
setAttribute()
removeAttribute()
dataset
.value, .href, .src, .alt jaise DOM properties
Accessibility attributes
Conditional updates
Safe DOM manipulation
XSS se basic protection
## Learning Objectives
1. Explain `textContent` and `innerHTML`.
2. Understand why untrusted HTML must not be inserted with `innerHTML`.
3. Read and update element properties safely.
4. Use `getAttribute()`, `setAttribute()`, and `removeAttribute()`.
5. Work with `data-*` attributes through `dataset`.
6. Update links, images, and accessibility attributes.
7. Perform conditional content updates.
8. Build an interactive text editor and quote generator.

---

## 1. textContent vs innerHTML

### textContent
`textContent` reads or writes the text contained inside an element.

```js
  const output = document.querySelector("#output");

output.textContent = "<strong>Hello</strong>";
```

The browser displays the characters `<strong>Hello</strong>` as text; it does not create a `<strong>` element.

### innerHTML
`innerHTML` reads or writes HTML markup.

```js
output.innerHTML = "<strong>Hello</strong>";
```

The browser interprets the string as HTML.

### Comparison

| Feature | textContent | innerHTML |
|---|---|---|
| Handles text | Yes | Yes |
| Parses HTML | No | Yes |
| Good for untrusted user text | Yes | No, unless safely sanitized |
| Can create markup | No | Yes |
| Main use | Safe text updates | Controlled/trusted HTML |

### Recommended rule
Use `textContent` by default. Use `innerHTML` only when you intentionally need HTML and the content is trusted or has been safely sanitized.

---

## 2. Security: Untrusted HTML and XSS

If user-controlled data is inserted into `innerHTML`, an attacker may inject HTML containing executable JavaScript.

Unsafe:

```js
const userInput = '<img src="x" onerror="alert(\'XSS\')">';
message.innerHTML = userInput;
```

The exact behavior depends on the browser and context, but the important lesson is that HTML parsing can turn untrusted strings into active markup.

Safer:

```js
message.textContent = userInput;
```

The input is displayed as text.

### Safer design principles
- Treat form input, URL parameters, API data, and external content as untrusted unless its trust has been established.
- Prefer `textContent`.
- Create DOM nodes with `document.createElement()` when structured content is required.
- If HTML from an untrusted source must be rendered, use a well-maintained HTML sanitizer and an appropriate security policy.
- Do not rely on escaping alone as a universal security strategy; the correct defense depends on the HTML/attribute/URL context.

---

## 3. Read and Update Element Properties

Many HTML attributes are reflected by convenient DOM properties.

```html
<input id="nameInput" value="Aditya">
<img id="photo" src="profile.jpg" alt="Profile photo">
<a id="siteLink" href="https://example.com">Visit</a>
```

```js
const input = document.querySelector("#nameInput");
const image = document.querySelector("#photo");
const link = document.querySelector("#siteLink");

console.log(input.value);
input.value = "Rahul";

console.log(image.src);
image.alt = "Updated profile photo";

console.log(link.href);
link.textContent = "Open Example";
```

### Property vs attribute
An HTML attribute is part of the element's markup/configuration. A DOM property is an object property representing current state or behavior.

For form controls this distinction matters:

```js
input.setAttribute("value", "Initial");
console.log(input.getAttribute("value")); // attribute value

console.log(input.value); // current live value
```

After the user types, `input.value` may differ from the original `value` attribute.

---

## 4. getAttribute(), setAttribute(), removeAttribute()

### getAttribute()
Reads an attribute.

```js
const link = document.querySelector("#siteLink");
console.log(link.getAttribute("href"));
```

If the attribute does not exist, `getAttribute()` returns `null`.

### setAttribute()
Creates or updates an attribute.

```js
link.setAttribute("target", "_blank");
link.setAttribute("rel", "noopener");
```

### removeAttribute()
Removes an attribute.

```js
link.removeAttribute("target");
```

### Check existence

```js
if (link.hasAttribute("target")) {
  console.log("Target exists");
}
```

---

## 5. data-* Attributes and dataset

Custom data attributes store small pieces of application-related data.

```html
<article id="quoteCard"
         data-author="A. P. J. Abdul Kalam"
         data-category="motivation">
  Dream, dream, dream.
</article>
```

Read them:

```js
const card = document.querySelector("#quoteCard");

console.log(card.dataset.author);
console.log(card.dataset.category);
```

Update them:

```js
card.dataset.category = "education";
```

Remove one:

```js
delete card.dataset.category;
```

Naming conversion:

```html
<div data-user-id="101"></div>
```

```js
element.dataset.userId; // "101"
```

---

## 6. Updating Links

```js
const link = document.querySelector("#profileLink");

link.href = "https://example.com/profile";
link.textContent = "View Profile";
link.setAttribute("aria-label", "View user profile");
```

For a link opening a new browsing context:

```js
link.target = "_blank";
link.rel = "noopener";
```

Only assign URLs that your application considers safe. Avoid blindly copying attacker-controlled URL strings into sensitive URL attributes.

---

## 7. Updating Images

```js
const image = document.querySelector("#avatar");

image.src = "student.jpg";
image.alt = "Student profile photograph";
image.width = 180;
```

Accessibility rule: meaningful images should have useful alternative text. Decorative images can use an empty `alt=""` when appropriate.

Do not use an image `title` attribute as a replacement for `alt`.

---

## 8. Accessibility Attributes

JavaScript can update ARIA attributes when the application's state changes.

```js
const button = document.querySelector("#menuButton");
const menu = document.querySelector("#menu");

button.setAttribute("aria-expanded", "false");

button.addEventListener("click", () => {
  const isOpen = menu.hidden === false;
  menu.hidden = isOpen;
  button.setAttribute("aria-expanded", String(!isOpen));
});
```

Use native HTML semantics first. ARIA should supplement semantics rather than unnecessarily replacing native controls.

---

## 9. Conditional Content Updates

```js
const status = document.querySelector("#status");
const score = 85;

if (score >= 40) {
  status.textContent = "Result: Pass";
  status.setAttribute("data-result", "pass");
} else {
  status.textContent = "Result: Fail";
  status.setAttribute("data-result", "fail");
}
```

For multiple states:

```js
if (score >= 80) {
  status.textContent = "Grade: A";
} else if (score >= 60) {
  status.textContent = "Grade: B";
} else if (score >= 40) {
  status.textContent = "Grade: C";
} else {
  status.textContent = "Grade: F";
}
```

---

## 10. Safer DOM Construction

When you need to create structured content from dynamic data, prefer DOM APIs:

```js
const list = document.querySelector("#list");
const item = document.createElement("li");

item.textContent = userName;
item.dataset.userId = String(userId);

list.append(item);
```

This avoids interpreting the user's name as HTML.

---

## Quick Summary

- `textContent` is the default choice for dynamic text.
- `innerHTML` parses strings as HTML and therefore requires careful trust/sanitization decisions.
- Use properties such as `.value`, `.href`, `.src`, `.alt`, `.checked`, and `.disabled` for appropriate live element state.
- Use `getAttribute`, `setAttribute`, and `removeAttribute` for explicit attribute operations.
- Use `dataset` for `data-*` attributes.
- Update `alt`, ARIA state, and visible labels when application state changes.
- Validate/safely handle dynamic URLs and other security-sensitive values.
- Use conditional logic to update content according to application state.
