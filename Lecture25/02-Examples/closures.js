// Lexical scope and closure intuition
function makeGreeter(name) {
  return () => `Hello, ${name}!`;
}
const greetAda = makeGreeter("Ada");
console.log(greetAda()); // Hello, Ada!

// Independent private counters
function createCounter(start = 0) {
  let count = start;
  return {
    increment() { count += 1; return count; },
    decrement() { count -= 1; return count; },
    value() { return count; }
  };
}
const counterA = createCounter();
const counterB = createCounter(10);
console.log(counterA.increment()); // 1
console.log(counterA.increment()); // 2
console.log(counterB.value());     // 10

// Configuration captured by a closure
function createDiscount(rate) {
  return price => price * (1 - rate);
}
const studentDiscount = createDiscount(0.15);
console.log(studentDiscount(200)); // 170

// Shared lexical binding
function createPair() {
  let score = 0;
  return {
    addPoint: () => ++score,
    getScore: () => score
  };
}
const game = createPair();
game.addPoint();
console.log(game.getScore()); // 1
