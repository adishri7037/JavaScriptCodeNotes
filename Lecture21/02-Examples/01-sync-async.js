// Run with Node.js: node 01-sync-async.js
console.log("1. Start");

setTimeout(() => {
  console.log("3. Timer callback");
}, 0);

console.log("2. End");

// Expected order:
// 1. Start
// 2. End
// 3. Timer callback
