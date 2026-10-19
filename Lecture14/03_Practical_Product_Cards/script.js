
const productGrid = document.querySelector("#productGrid");
const clearAllButton = document.querySelector("#clearAll");

const products = [
  {
    id: 1,
    name: "Laptop Pro",
    category: "Electronics",
    price: 65000,
    description: "A powerful laptop for programming and productivity."
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Audio",
    price: 2500,
    description: "Comfortable headphones with clear wireless audio."
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 4200,
    description: "A responsive keyboard for coding and gaming."
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Wearables",
    price: 7999,
    description: "Track activity, notifications and daily routines."
  },
  {
    id: 5,
    name: "USB-C Hub",
    category: "Accessories",
    price: 1800,
    description: "Expand your laptop with multiple useful ports."
  },
  {
    id: 6,
    name: "Webcam",
    category: "Camera",
    price: 3200,
    description: "Full HD webcam for classes and online meetings."
  }
];

function createProductCard(product) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h2");
  title.textContent = product.name;

  const category = document.createElement("p");
  category.textContent = `Category: ${product.category}`;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = `₹${product.price.toLocaleString("en-IN")}`;

  const description = document.createElement("p");
  description.textContent = product.description;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn");
  removeButton.type = "button";
  removeButton.textContent = "Remove Product";
  removeButton.setAttribute("aria-label", `Remove ${product.name}`);

  removeButton.addEventListener("click", () => {
    card.remove();
  });

  // Configure the card before inserting it into the live DOM.
  card.append(title, category, price, description, removeButton);

  return card;
}

function renderProducts(productList) {
  // Clear old content before a complete re-render.
  productGrid.replaceChildren();

  // Build everything in a fragment first.
  const fragment = document.createDocumentFragment();

  productList.forEach(product => {
    fragment.appendChild(createProductCard(product));
  });

  // One insertion into the live DOM.
  productGrid.appendChild(fragment);
}

clearAllButton.addEventListener("click", () => {
  productGrid.replaceChildren();
});

renderProducts(products);
