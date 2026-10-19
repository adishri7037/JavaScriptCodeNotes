# Array Methods & Higher-Order Thinking


### Learning Objectives
By the end of this lecture, students should be able to:
- Explain higher-order functions and callbacks.
- Use `forEach`, `map`, `filter`, and `reduce`.
- Use `find`, `findIndex`, `some`, and `every`.
- Choose an appropriate array method for a given problem.
- Build readable method chains.
- Analyze marks or sales data using array methods.

---

## 1. Higher-Order Functions

A **higher-order function** is a function that:
1. accepts another function as an argument, or
2. returns a function.

Array methods such as `map`, `filter`, `reduce`, and `forEach` are commonly used as higher-order functions.

```js
function greet(name) {
    return `Hello, ${name}`;
}

function processUser(name, callback) {
    console.log(callback(name));
}

processUser("Aman", greet);
```

Here `greet` is passed as a callback argument.

---

## 2. Callback Functions

A **callback** is a function passed to another function to be executed later/by that function.

```js
const numbers = [10, 20, 30];

numbers.forEach(function (number) {
    console.log(number);
});
```

Arrow-function version:

```js
numbers.forEach(number => console.log(number));
```

A callback can receive useful arguments. For most array iteration methods, the callback can receive:

```js
(value, index, array)
```

Example:

```js
const students = ["Aman", "Riya", "Kunal"];

students.forEach((student, index) => {
    console.log(index, student);
});
```

---

# 3. forEach()

`forEach()` executes a callback once for every array element.

### Syntax

```js
array.forEach((value, index, array) => {
    // code
});
```

### Example

```js
const marks = [72, 85, 64, 91];

marks.forEach(mark => {
    console.log(mark);
});
```

### Important Point

`forEach()` is mainly used when you want to **perform an action** for each element.

It does not create a new transformed array.

```js
const marks = [70, 80, 90];

const result = marks.forEach(mark => mark + 5);

console.log(result); // undefined
```

### When to use
- Display/log each item
- Update an external result
- Perform an operation for every item

---

# 4. map()

`map()` creates a **new array** by transforming every element.

### Syntax

```js
const newArray = array.map((value, index, array) => {
    return transformedValue;
});
```

### Example

```js
const marks = [60, 70, 80];

const updatedMarks = marks.map(mark => mark + 5);

console.log(updatedMarks);
// [65, 75, 85]
```

The original array remains unchanged:

```js
console.log(marks);
// [60, 70, 80]
```

### Object example

```js
const students = [
    { name: "Aman", marks: 72 },
    { name: "Riya", marks: 88 },
    { name: "Kunal", marks: 65 }
];

const names = students.map(student => student.name);

console.log(names);
// ["Aman", "Riya", "Kunal"]
```

### Think of map as:
**One input element → one output element**

---

# 5. filter()

`filter()` creates a new array containing only elements that satisfy a condition.

### Example

```js
const marks = [45, 67, 82, 39, 91];

const passed = marks.filter(mark => mark >= 50);

console.log(passed);
// [67, 82, 91]
```

### Object example

```js
const students = [
    { name: "Aman", marks: 72 },
    { name: "Riya", marks: 88 },
    { name: "Kunal", marks: 42 }
];

const toppers = students.filter(student => student.marks >= 75);

console.log(toppers);
```

### Think of filter as:
**Many input elements → zero or more output elements**

---

# 6. reduce()

`reduce()` processes an array and combines its elements into a single accumulated result.

### Syntax

```js
array.reduce((accumulator, currentValue) => {
    return newAccumulator;
}, initialValue);
```

### Sum example

```js
const marks = [70, 80, 90];

const total = marks.reduce((sum, mark) => {
    return sum + mark;
}, 0);

console.log(total); // 240
```

### Average example

```js
const marks = [70, 80, 90];

const total = marks.reduce((sum, mark) => sum + mark, 0);
const average = total / marks.length;

console.log(average); // 80
```

### Find maximum

```js
const marks = [72, 91, 68, 85];

const highest = marks.reduce((max, mark) => {
    return mark > max ? mark : max;
}, marks[0]);

console.log(highest); // 91
```

### Counting categories

```js
const results = ["Pass", "Fail", "Pass", "Pass", "Fail"];

const counts = results.reduce((acc, result) => {
    acc[result] = (acc[result] || 0) + 1;
    return acc;
}, {});

console.log(counts);
// { Pass: 3, Fail: 2 }
```

### Think of reduce as:
**Many input elements → one final result**

The final result does not have to be a number. It can be an object, array, string, etc.

---

# 7. find()

`find()` returns the **first element** that satisfies a condition.

```js
const marks = [45, 62, 78, 91];

const firstHighMark = marks.find(mark => mark >= 75);

console.log(firstHighMark);
// 78
```

If no match exists:

```js
const result = marks.find(mark => mark > 100);

console.log(result);
// undefined
```

### Object example

```js
const students = [
    { id: 1, name: "Aman", marks: 72 },
    { id: 2, name: "Riya", marks: 88 }
];

const student = students.find(student => student.id === 2);

console.log(student);
// { id: 2, name: "Riya", marks: 88 }
```

---

# 8. findIndex()

`findIndex()` returns the index of the first matching element.

```js
const marks = [45, 62, 78, 91];

const index = marks.findIndex(mark => mark >= 75);

console.log(index);
// 2
```

If no match exists:

```js
console.log(marks.findIndex(mark => mark > 100));
// -1
```

### Difference

- `find()` → returns the matching element.
- `findIndex()` → returns its index.

---

# 9. some()

`some()` checks whether **at least one** element satisfies a condition.

```js
const marks = [45, 48, 72, 81];

const hasTopper = marks.some(mark => mark >= 80);

console.log(hasTopper);
// true
```

Think:
> "Is there at least one?"

---

# 10. every()

`every()` checks whether **all** elements satisfy a condition.

```js
const marks = [72, 81, 90, 67];

const allPassed = marks.every(mark => mark >= 40);

console.log(allPassed);
// true
```

Think:
> "Do all elements satisfy this condition?"

Example:

```js
const marks = [72, 81, 35, 67];

console.log(marks.every(mark => mark >= 40));
// false
```

---

# 11. Method Comparison

| Method | Main purpose | Result |
|---|---|---|
| `forEach` | Perform an action | `undefined` |
| `map` | Transform every item | New array |
| `filter` | Select matching items | New array |
| `reduce` | Combine into one result | Any single accumulated result |
| `find` | Find first matching item | Element / `undefined` |
| `findIndex` | Find first matching index | Number / `-1` |
| `some` | Check whether any match | Boolean |
| `every` | Check whether all match | Boolean |

---

# 12. Choosing the Correct Method

### Question 1: "Print every student's name."
Use `forEach()`.

### Question 2: "Create an array containing only student names."
Use `map()`.

### Question 3: "Get students who scored 75 or more."
Use `filter()`.

### Question 4: "Calculate total sales."
Use `reduce()`.

### Question 5: "Find the first student who scored 90+."
Use `find()`.

### Question 6: "Find the position of student ID 105."
Use `findIndex()`.

### Question 7: "Check whether at least one sale exceeded ₹50,000."
Use `some()`.

### Question 8: "Check whether every student passed."
Use `every()`.

---

# 13. Method Chaining

Method chaining means using the result of one array method as the input to another.

Example:

```js
const marks = [35, 45, 60, 72, 85, 90];

const result = marks
    .filter(mark => mark >= 50)
    .map(mark => mark + 5);

console.log(result);
// [50, 65, 77, 90, 95]
```

The chain is:

```text
Original array
     ↓
filter()
     ↓
Passing marks
     ↓
map()
     ↓
Updated marks
```

### More complex example

```js
const students = [
    { name: "Aman", marks: 72 },
    { name: "Riya", marks: 88 },
    { name: "Kunal", marks: 45 },
    { name: "Neha", marks: 91 }
];

const topperNames = students
    .filter(student => student.marks >= 75)
    .map(student => student.name);

console.log(topperNames);
// ["Riya", "Neha"]
```

---

# 14. Readability in Method Chaining

Avoid writing difficult one-line chains when the logic becomes complex.

Less readable:

```js
const result = students.filter(s => s.marks >= 50).map(s => s.marks + 5).reduce((a, b) => a + b, 0);
```

More readable:

```js
const passedStudents = students.filter(student => student.marks >= 50);

const improvedMarks = passedStudents.map(student => student.marks + 5);

const total = improvedMarks.reduce((sum, mark) => sum + mark, 0);

console.log(total);
```

Use intermediate variables when:
- A chain becomes long.
- Conditions are complicated.
- The intermediate result has a meaningful name.
- Students need to debug the logic.

---

# 15. Practical: Analyze Student Marks

```js
const students = [
    { name: "Aman", marks: 78 },
    { name: "Riya", marks: 92 },
    { name: "Kunal", marks: 45 },
    { name: "Neha", marks: 85 },
    { name: "Arjun", marks: 67 }
];

// 1. Display all students
students.forEach(student => {
    console.log(`${student.name}: ${student.marks}`);
});

// 2. Get names
const names = students.map(student => student.name);
console.log("Names:", names);

// 3. Find passed students
const passed = students.filter(student => student.marks >= 40);
console.log("Passed:", passed);

// 4. Find first student with 90+
const topper = students.find(student => student.marks >= 90);
console.log("90+ student:", topper);

// 5. Find highest marks
const highest = students.reduce((max, student) => {
    return student.marks > max ? student.marks : max;
}, students[0].marks);

console.log("Highest:", highest);

// 6. Calculate average
const total = students.reduce((sum, student) => {
    return sum + student.marks;
}, 0);

const average = total / students.length;
console.log("Average:", average);

// 7. Is anyone below passing?
const hasFailed = students.some(student => student.marks < 40);
console.log("Any failed:", hasFailed);

// 8. Did everyone pass?
const everyonePassed = students.every(student => student.marks >= 40);
console.log("Everyone passed:", everyonePassed);
```

---

# 16. Practical: Analyze Sales Data

```js
const sales = [
    { product: "Laptop", amount: 65000, quantity: 2 },
    { product: "Mouse", amount: 1200, quantity: 10 },
    { product: "Keyboard", amount: 2500, quantity: 5 },
    { product: "Monitor", amount: 18000, quantity: 3 },
    { product: "Headphones", amount: 3500, quantity: 8 }
];

// Total revenue
const totalRevenue = sales.reduce((total, item) => {
    return total + item.amount * item.quantity;
}, 0);

console.log("Total Revenue:", totalRevenue);

// Products with quantity >= 5
const bulkProducts = sales.filter(item => item.quantity >= 5);
console.log("Bulk Products:", bulkProducts);

// Product names
const productNames = sales.map(item => item.product);
console.log("Products:", productNames);

// First high-value product
const highValue = sales.find(item => item.amount >= 20000);
console.log("First high-value product:", highValue);

// Any product sold in quantity 10+
const hasBulkSale = sales.some(item => item.quantity >= 10);
console.log("Any bulk sale:", hasBulkSale);

// Every product sold at least once
const allSold = sales.every(item => item.quantity > 0);
console.log("All products sold:", allSold);
```

---

# 17. Common Mistakes

### Mistake 1: Expecting forEach() to return an array

```js
const result = [1, 2, 3].forEach(n => n * 2);

console.log(result); // undefined
```

Use `map()` when you need a new array.

### Mistake 2: Forgetting return in map()

Wrong:

```js
const doubled = [1, 2, 3].map(n => {
    n * 2;
});
```

Correct:

```js
const doubled = [1, 2, 3].map(n => {
    return n * 2;
});
```

Or:

```js
const doubled = [1, 2, 3].map(n => n * 2);
```

### Mistake 3: Using filter() to find one item

If you need only the first matching item, use `find()`.

### Mistake 4: Confusing some() and every()

```js
some()  // at least one
every() // all
```

### Mistake 5: Using reduce() when a simpler method is clearer

Do not use `reduce()` just because it can technically solve many problems. Choose the method that communicates the intent clearly.

---

# 18. Quick Decision Guide

Ask yourself:

```text
Do I need to perform an action for every item?
        → forEach

Do I need one output for every input?
        → map

Do I need only matching items?
        → filter

Do I need one accumulated result?
        → reduce

Do I need the first matching item?
        → find

Do I need the first matching position?
        → findIndex

Do I need to know if at least one matches?
        → some

Do I need to know if all match?
        → every
```

---

# 19. Hands-on Exercises

1. Given marks, print each student's name using `forEach()`.
2. Create an array containing marks increased by 5 using `map()`.
3. Get all students who scored at least 60 using `filter()`.
4. Calculate the total marks using `reduce()`.
5. Find the first student who scored above 90 using `find()`.
6. Find the index of a student with a specified ID using `findIndex()`.
7. Check whether any student failed using `some()`.
8. Check whether all students scored at least 40 using `every()`.
9. Chain `filter()` and `map()` to get names of students who scored 75+.
10. Calculate total revenue from a sales array using `reduce()`.

---

# 20. Key Takeaways

- Array methods make data processing expressive and reusable.
- Callbacks allow behavior to be supplied to array methods.
- `map()` transforms.
- `filter()` selects.
- `reduce()` accumulates.
- `find()` locates an element.
- `findIndex()` locates an index.
- `some()` checks for at least one match.
- `every()` checks whether all elements match.
- `forEach()` performs an action for each element.
- Method chaining can make data-processing pipelines clear when kept readable.
