function calculate(a, b, operation) {
  return operation(a, b);
}

const subtract = (x, y) => x - y;
const divide = (x, y) => x / y;

console.log(calculate(10, 4, subtract)); // 6
console.log(calculate(20, 5, divide));  // 4
