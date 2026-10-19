console.log("A");

setTimeout(() => console.log("B: timeout"), 0);

Promise.resolve().then(() => console.log("C: promise"));

console.log("D");

// Expected typical order:
// A
// D
// C: promise
// B: timeout
