// 1. FOR LOOP
// Best when the number of iterations is known.

for (let i = 1; i <= 5; i++) {
  console.log("for:", i);
}

// Loop structure:
// initialization -> condition -> body -> update -> condition...

// Example: sum of 1 to 10
let sum = 0;

for (let i = 1; i <= 10; i++) {
  sum += i;
}

console.log("Sum:", sum);


// 2. WHILE LOOP
// Useful when repetition depends on a condition.

let count = 1;

while (count <= 5) {
  console.log("while:", count);
  count++;
}

// IMPORTANT: update the variable so the condition eventually becomes false.
// Otherwise, the loop may become infinite.


// Example: countdown
let n = 5;

while (n >= 1) {
  console.log(n);
  n--;
}


// 3. DO...WHILE LOOP
// The body executes at least once, even if the condition is false.

let x = 10;

do {
  console.log("do...while executed once");
  x++;
} while (x < 5);

// Difference:
// while -> checks condition before the first execution.
// do...while -> executes once, then checks condition.
