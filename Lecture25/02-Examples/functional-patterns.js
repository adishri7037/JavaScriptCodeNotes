// Pure transformations
const trim = text => text.trim();
const lower = text => text.toLowerCase();
const hyphenate = text => text.replace(/\s+/g, "-");

const pipe = (...fns) => input =>
  fns.reduce((value, fn) => fn(value), input);

const slugify = pipe(trim, lower, hyphenate);
console.log(slugify("  Functional JavaScript Patterns  "));
// functional-javascript-patterns

// Pure state update: create a new object instead of mutating the old one.
const account = { owner: "Mina", balance: 100 };
const deposit = (currentAccount, amount) => ({
  ...currentAccount,
  balance: currentAccount.balance + amount
});
const updatedAccount = deposit(account, 25);
console.log(account.balance);        // 100
console.log(updatedAccount.balance); // 125

// Pure array update
const tasks = [
  { id: 1, done: false },
  { id: 2, done: false }
];
const markDone = (items, id) =>
  items.map(item => item.id === id ? { ...item, done: true } : item);

const nextTasks = markDone(tasks, 2);
console.log(tasks[1].done);     // false
console.log(nextTasks[1].done); // true

// Small memoization example
function memoizeUnary(fn) {
  const cache = new Map();
  return value => {
    if (cache.has(value)) return cache.get(value);
    const result = fn(value);
    cache.set(value, result);
    return result;
  };
}
const square = memoizeUnary(n => n * n);
console.log(square(6)); // 36
console.log(square(6)); // cached 36
