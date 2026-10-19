console.log("1. Start");

[1, 2].forEach(value => console.log("Sync callback:", value));

setTimeout(() => console.log("Async callback: timer"), 0);

console.log("2. End");

// Typical output:
// 1. Start
// Sync callback: 1
// Sync callback: 2
// 2. End
// Async callback: timer
