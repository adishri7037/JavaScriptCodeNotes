// LOOP PROBLEM-SOLVING PATTERNS

// 1. Accumulator pattern: sum
const nums = [10, 20, 30, 40];
let total = 0;

for (const num of nums) {
  total += num;
}
console.log("Total:", total);


// 2. Counting pattern
let evenCount = 0;

for (const num of nums) {
  if (num % 2 === 0) {
    evenCount++;
  }
}
console.log("Even count:", evenCount);


// 3. Search pattern
const values = [4, 9, 12, 18, 25];
let found = false;

for (const value of values) {
  if (value === 18) {
    found = true;
    break;
  }
}
console.log("18 found:", found);


// 4. Maximum value
let max = nums[0];

for (let i = 1; i < nums.length; i++) {
  if (nums[i] > max) {
    max = nums[i];
  }
}
console.log("Maximum:", max);


// 5. Reverse counting
for (let i = 10; i >= 1; i--) {
  console.log(i);
}


// 6. Factorial
const number = 5;
let factorial = 1;

for (let i = 1; i <= number; i++) {
  factorial *= i;
}
console.log(`${number}! =`, factorial);


// 7. Prime check
const n = 29;
let isPrime = n >= 2;

for (let i = 2; i * i <= n; i++) {
  if (n % i === 0) {
    isPrime = false;
    break;
  }
}
console.log(n, "is prime:", isPrime);


// 8. FizzBuzz
for (let i = 1; i <= 30; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
