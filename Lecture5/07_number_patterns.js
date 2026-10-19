// NUMBER PATTERNS

// Pattern 1
// 1
// 12
// 123
// 1234
// 12345

for (let i = 1; i <= 5; i++) {
  let line = "";

  for (let j = 1; j <= i; j++) {
    line += j;
  }

  console.log(line);
}


// Pattern 2
// 1
// 22
// 333
// 4444
// 55555

for (let i = 1; i <= 5; i++) {
  let line = "";

  for (let j = 1; j <= i; j++) {
    line += i;
  }

  console.log(line);
}


// Pattern 3
// 12345
// 1234
// 123
// 12
// 1

for (let i = 5; i >= 1; i--) {
  let line = "";

  for (let j = 1; j <= i; j++) {
    line += j;
  }

  console.log(line);
}


// Pattern 4: Continuous numbers
// 1
// 23
// 456
// 78910

let value = 1;

for (let i = 1; i <= 4; i++) {
  let line = "";

  for (let j = 1; j <= i; j++) {
    line += value + " ";
    value++;
  }

  console.log(line);
}


// Pattern 5: Multiplication table
const table = 7;

for (let i = 1; i <= 10; i++) {
  console.log(`${table} x ${i} = ${table * i}`);
}
