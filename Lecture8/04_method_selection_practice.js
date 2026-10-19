// Method Selection Practice
// Fill in or compare the correct array method for each task.

const numbers = [10, 15, 20, 25, 30];

// 1. Print every number.
// Suggested method: forEach

numbers.forEach(number => {
    console.log(number);
});

// 2. Create a new array with every number doubled.
// Suggested method: map

const doubled = numbers.map(number => number * 2);
console.log("Doubled:", doubled);

// 3. Get numbers greater than 20.
// Suggested method: filter

const greaterThan20 = numbers.filter(number => number > 20);
console.log("Greater than 20:", greaterThan20);

// 4. Calculate the total.
// Suggested method: reduce

const total = numbers.reduce((sum, number) => sum + number, 0);
console.log("Total:", total);

// 5. Find the first number greater than 18.
// Suggested method: find

const firstGreaterThan18 = numbers.find(number => number > 18);
console.log("First > 18:", firstGreaterThan18);

// 6. Find the index of 25.
// Suggested method: findIndex

const indexOf25 = numbers.findIndex(number => number === 25);
console.log("Index of 25:", indexOf25);

// 7. Check if at least one number is greater than 28.
// Suggested method: some

const hasNumberGreaterThan28 = numbers.some(number => number > 28);
console.log("Any > 28:", hasNumberGreaterThan28);

// 8. Check if every number is positive.
// Suggested method: every

const allPositive = numbers.every(number => number > 0);
console.log("All positive:", allPositive);
