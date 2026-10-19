# Creating, Inserting & Removing Elements

## 1. Learning Objectives
By the end of this lecture, students should be able to:
- Create HTML elements dynamically with `document.createElement()`.
- Insert nodes using `append()` and `appendChild()`.
- Remove elements with `remove()`.
- Generate repeated UI from JavaScript object/array data.
- Reduce inefficient repeated DOM writes.
- Build dynamic product cards from a JavaScript array.

## 2. createElement()
`document.createElement("tagName")` creates a new DOM element in memory.

Example:
```js
const heading = document.createElement("h2");
heading.textContent = "Dynamic Heading";
```
Creating an element does not automatically display it. It must be inserted into the DOM.

## 3. append()
`append()` inserts one or more nodes or strings at the end of a parent.

```js
const box = document.querySelector("#box");
const p = document.createElement("p");
p.textContent = "Hello";
box.append(p);
```

It can append multiple items:
```js
box.append(p, "Some text");
```

## 4. appendChild()
`appendChild()` inserts one Node at the end of a parent and returns the inserted node.

```js
const list = document.querySelector("#list");
const li = document.createElement("li");
li.textContent = "JavaScript";
list.appendChild(li);
```

### append vs appendChild
- `append()` can accept multiple nodes and strings.
- `appendChild()` accepts a Node.
- Both add at the end of the parent.
- For beginner DOM work, either is useful; choose based on the required API behavior.

## 5. remove()
`element.remove()` removes an element from its parent.

```js
const card = document.querySelector(".card");
card.remove();
```

You can also remove a dynamically created item after a button click.

## 6. Creating Elements from Object Data
Instead of writing every card manually in HTML, keep data in JavaScript:

```js
const products = [
  { id: 1, name: "Laptop", price: 65000 },
  { id: 2, name: "Headphones", price: 2500 }
];
```

Loop over the data and create the required DOM elements.

## 7. Avoiding Inefficient Repeated DOM Writes
A common inefficient pattern is repeatedly modifying a large DOM container inside a loop.

Prefer:
1. Create elements in memory.
2. Configure their content/classes/attributes.
3. Build a `DocumentFragment`.
4. Append the fragment once.

Example:
```js
const fragment = document.createDocumentFragment();

products.forEach(product => {
  const card = document.createElement("article");
  card.textContent = product.name;
  fragment.append(card);
});

container.append(fragment);
```

A `DocumentFragment` lets you assemble a group of nodes before inserting them into the live document.

## 8. Practical: Dynamic Product Cards
The practical uses:
- An array of product objects.
- A reusable `createProductCard()` function.
- `createElement()` for the card and its children.
- `textContent` for safe text insertion.
- `DocumentFragment` for efficient batch insertion.
- A Remove button for each card.
- A Clear All button.


## 10. Suggested Classroom Flow
1. Demonstrate `createElement()`.
2. Add a node using `append()`.
3. Compare `append()` with `appendChild()`.
4. Remove a node using `remove()`.
5. Introduce an array of objects.
6. Convert one object into one card.
7. Loop over all products.
8. Improve the implementation with `DocumentFragment`.


1. CREATE
   ↓
2. CONFIGURE
   ↓
3. APPEND
   ↓
4. DISPLAY
   ↓
5. REMOVE

