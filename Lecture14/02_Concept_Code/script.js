

const output = document.querySelector("#output");
const fragment = document.createDocumentFragment();

// Create one product card from an object.
function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const title = document.createElement("h3");
  title.textContent = product.name;

  const category = document.createElement("p");
  category.textContent = `Category: ${product.category}`;

  const price = document.createElement("p");
  price.textContent = `Price: ₹${product.price}`;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";

  removeButton.addEventListener("click", () => {
    card.remove();
  });

  // append() can add multiple nodes at once.
  card.append(title, category, price, removeButton);

  return card;
}

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 65000 },
  { id: 2, name: "Wireless Headphones", category: "Audio", price: 2500 },
  { id: 3, name: "Mechanical Keyboard", category: "Accessories", price: 4200 }
];

// Build the cards off-DOM first.
products.forEach(product => {
  const card = createProductCard(product);
  fragment.appendChild(card);
});

// Insert all cards in one DOM operation.
output.append(fragment);

// appendChild() example:
const note = document.createElement("p");
note.textContent = "Cards were generated from JavaScript object data.";
output.appendChild(note);

// append() example:
const extra = document.createElement("p");
extra.textContent = "You can remove any card using its Remove button.";
output.append(extra);
