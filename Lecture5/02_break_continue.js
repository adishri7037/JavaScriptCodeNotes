// BREAK
// Immediately terminates the nearest loop.

for (let i = 1; i <= 10; i++) {
  if (i === 6) {
    break;
  }
  console.log(i);
}
// Output: 1 2 3 4 5


// CONTINUE
// Skips the current iteration and moves to the next iteration.

for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;
  }
  console.log("Odd:", i);
}


// Example: find the first number divisible by 7
for (let i = 1; i <= 100; i++) {
  if (i % 7 === 0) {
    console.log("First multiple of 7:", i);
    break;
  }
}


// Common mistake:
// In a while loop, make sure continue does not skip the update.
// Bad idea:
// let i = 1;
// while (i <= 5) {
//   if (i === 3) continue;
//   i++;
// }
// This can create an infinite loop when i becomes 3.
