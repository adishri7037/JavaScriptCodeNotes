
const product = {
  id: 501,
  name: "Laptop",
  price: 55000,
  stock: 12
};

console.log("Keys:", Object.keys(product));
console.log("Values:", Object.values(product));
console.log("Entries:", Object.entries(product));

for (const [key, value] of Object.entries(product)) {
  console.log(`${key}: ${value}`);
}
