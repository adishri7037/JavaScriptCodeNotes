// NESTED LOOPS
// A loop inside another loop.
// For every one iteration of the outer loop,
// the inner loop completes all of its iterations.

for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 4; col++) {
    console.log(`row=${row}, col=${col}`);
  }
}


// Multiplication table from 1 to 5
for (let i = 1; i <= 5; i++) {
  for (let j = 1; j <= 10; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}


// 2D array traversal
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log(matrix[row][col]);
  }
}

// Complexity idea:
// If outer loop runs n times and inner loop runs n times,
// total iterations are approximately n * n = n².
