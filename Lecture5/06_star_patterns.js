// STAR PATTERNS
// Key idea: outer loop controls ROWS.
// Inner loop controls the number of symbols in each row.

// Pattern 1: Square
// ****
// ****
// ****
// ****

const rows = 4;

for (let i = 1; i <= rows; i++) {
  let line = "";

  for (let j = 1; j <= rows; j++) {
    line += "* ";
  }

  console.log(line);
}


// Pattern 2: Right triangle
// *
// * *
// * * *
// * * * *

for (let i = 1; i <= 4; i++) {
  let line = "";

  for (let j = 1; j <= i; j++) {
    line += "* ";
  }

  console.log(line);
}


// Pattern 3: Inverted triangle
// * * * *
// * * *
// * *
// *

for (let i = 4; i >= 1; i--) {
  let line = "";

  for (let j = 1; j <= i; j++) {
    line += "* ";
  }

  console.log(line);
}


// Pattern 4: Number triangle
// 1
// 1 2
// 1 2 3
// 1 2 3 4

for (let i = 1; i <= 4; i++) {
  let line = "";

  for (let j = 1; j <= i; j++) {
    line += j + " ";
  }

  console.log(line);
}


// Pattern 5: Repeated row number
// 1
// 2 2
// 3 3 3
// 4 4 4 4

for (let i = 1; i <= 4; i++) {
  let line = "";

  for (let j = 1; j <= i; j++) {
    line += i + " ";
  }

  console.log(line);
}


// Pattern 6: Pyramid
//    *
//   ***
//  *****
// *******

for (let i = 1; i <= 4; i++) {
  let line = "";

  // spaces
  for (let s = 1; s <= 4 - i; s++) {
    line += " ";
  }

  // stars
  for (let j = 1; j <= 2 * i - 1; j++) {
    line += "*";
  }

  console.log(line);
}
