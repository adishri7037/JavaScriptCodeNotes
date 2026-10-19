// A higher-order function accepts another function.
function calculate(a, b, operation) {
  return operation(a, b);
}
console.log(calculate(8, 2, (a, b) => a + b)); // 10
console.log(calculate(8, 2, (a, b) => a / b)); // 4

// A higher-order function returns another function.
function withPrefix(prefix) {
  return message => `${prefix}: ${message}`;
}
const warn = withPrefix("WARNING");
console.log(warn("Low disk space"));

// Built-in higher-order functions
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.map(n => n * 2));       // [2, 4, 6, 8, 10]
console.log(numbers.filter(n => n % 2));    // [1, 3, 5]
console.log(numbers.reduce((sum, n) => sum + n, 0)); // 15

// Reusable configurable validator
function minLength(length) {
  return value => typeof value === "string" && value.length >= length;
}
const validPassword = minLength(8);
console.log(validPassword("secure123")); // true
console.log(validPassword("short"));     // false
