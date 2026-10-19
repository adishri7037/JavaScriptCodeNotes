// Practical: Sales Data Analysis
// Run with: node 03_sales_analysis.js

const sales = [
    { product: "Laptop", amount: 65000, quantity: 2 },
    { product: "Mouse", amount: 1200, quantity: 10 },
    { product: "Keyboard", amount: 2500, quantity: 5 },
    { product: "Monitor", amount: 18000, quantity: 3 },
    { product: "Headphones", amount: 3500, quantity: 8 }
];

// forEach: display each sale
console.log("=== SALES ===");
sales.forEach(item => {
    const revenue = item.amount * item.quantity;
    console.log(`${item.product}: ₹${revenue}`);
});

// map: create product-name array
const productNames = sales.map(item => item.product);
console.log("\nProducts:", productNames);

// map: calculate revenue per product
const revenues = sales.map(item => ({
    product: item.product,
    revenue: item.amount * item.quantity
}));
console.log("\nRevenue by product:", revenues);

// filter: products sold in bulk
const bulkProducts = sales.filter(item => item.quantity >= 5);
console.log("\nBulk products:", bulkProducts);

// reduce: total revenue
const totalRevenue = sales.reduce(
    (total, item) => total + item.amount * item.quantity,
    0
);
console.log("\nTotal revenue: ₹" + totalRevenue);

// find: first product costing at least ₹20,000
const expensiveProduct = sales.find(item => item.amount >= 20000);
console.log("\nFirst expensive product:", expensiveProduct);

// findIndex: position of Monitor
const monitorIndex = sales.findIndex(item => item.product === "Monitor");
console.log("\nMonitor index:", monitorIndex);

// some: any quantity 10+
const hasBulkSale = sales.some(item => item.quantity >= 10);
console.log("\nAny 10+ quantity sale?", hasBulkSale);

// every: all quantities positive
const allValid = sales.every(item => item.quantity > 0);
console.log("\nAll sales have positive quantity?", allValid);

// chaining: names of products with revenue above ₹10,000
const highRevenueProducts = sales
    .map(item => ({
        product: item.product,
        revenue: item.amount * item.quantity
    }))
    .filter(item => item.revenue > 10000)
    .map(item => item.product);

console.log("\nProducts with revenue > ₹10,000:", highRevenueProducts);
