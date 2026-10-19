// arrays-concepts.js
// JavaScript Arrays - lecture examples

console.log("=== 1. CREATE ARRAYS & ACCESS BY INDEX ===");

const fruits = ["Apple", "Banana", "Mango", "Orange"];

console.log(fruits);
console.log(fruits[0]); // first element
console.log(fruits[2]); // third element
console.log(fruits[fruits.length - 1]); // last element

// Arrays are zero-indexed:
// index:    0        1         2        3
// value: Apple    Banana     Mango    Orange


console.log("\n=== 2. LENGTH & ITERATION ===");

console.log("Number of fruits:", fruits.length);

for (let i = 0; i < fruits.length; i++) {
    console.log(i, fruits[i]);
}

// for...of gives values
for (const fruit of fruits) {
    console.log("Fruit:", fruit);
}

// forEach is another common iteration method
fruits.forEach((fruit, index) => {
    console.log(index, fruit);
});


console.log("\n=== 3. MUTATING ARRAY METHODS ===");

const numbers = [10, 20, 30];

numbers.push(40);       // adds at end
console.log("push:", numbers);

const removedLast = numbers.pop(); // removes last
console.log("pop removed:", removedLast, numbers);

numbers.unshift(5);     // adds at beginning
console.log("unshift:", numbers);

const removedFirst = numbers.shift(); // removes first
console.log("shift removed:", removedFirst, numbers);


// splice(start, deleteCount, ...items)
// It changes the original array.
const colors = ["red", "green", "blue", "yellow"];

colors.splice(1, 1); // remove "green"
console.log("splice remove:", colors);

colors.splice(1, 0, "purple"); // insert without deleting
console.log("splice insert:", colors);

colors.splice(2, 1, "black"); // replace one item
console.log("splice replace:", colors);


console.log("\n=== 4. NON-MUTATING SLICE ===");

const names = ["Amit", "Neha", "Ravi", "Priya", "Karan"];

const part = names.slice(1, 4); // index 1 to before index 4
console.log("Original:", names);
console.log("slice result:", part);

// slice does NOT change names.


console.log("\n=== 5. indexOf, includes & find ===");

const marks = [65, 82, 91, 75, 82];

console.log("indexOf 82:", marks.indexOf(82)); // first matching index
console.log("includes 91:", marks.includes(91));
console.log("includes 100:", marks.includes(100));

const firstHighMark = marks.find(mark => mark >= 90);
console.log("First mark >= 90:", firstHighMark);

const students = [
    { id: 1, name: "Aman", marks: 78 },
    { id: 2, name: "Priya", marks: 91 },
    { id: 3, name: "Ravi", marks: 84 }
];

const topper = students.find(student => student.marks >= 90);
console.log("First student with marks >= 90:", topper);


console.log("\n=== 6. MUTATING VS NON-MUTATING ===");

const original = ["A", "B", "C"];

original.push("D"); // MUTATES original
console.log("After push:", original);

const copy = original.slice(); // creates a new array
copy.push("E");

console.log("Original after copy.push:", original);
console.log("Copy:", copy);

// Common mutating methods:
// push, pop, shift, unshift, splice
//
// Common non-mutating examples:
// slice, includes, indexOf, find
//
// Important: const prevents reassignment of the variable,
// but it does NOT make an array immutable.


console.log("\n=== 7. ARRAYS OF RECORDS ===");

const studentRecords = [
    { id: 101, name: "Aarav", course: "B.Tech", marks: 86 },
    { id: 102, name: "Diya", course: "B.Tech", marks: 94 },
    { id: 103, name: "Kabir", course: "B.Tech", marks: 72 }
];

console.log(studentRecords[0]);
console.log(studentRecords[0].name);
console.log(studentRecords[1].marks);

for (const student of studentRecords) {
    console.log(
        `${student.id} - ${student.name} - ${student.marks}`
    );
}

const student = studentRecords.find(s => s.id === 102);
console.log("Student with ID 102:", student);


// Example mutation of a record
studentRecords[0].marks = 90;
console.log("Updated first student:", studentRecords[0]);


// Quick reference
console.log("\n=== QUICK REFERENCE ===");
console.log(`
push(value)       -> add at end; MUTATES
pop()             -> remove from end; MUTATES
unshift(value)    -> add at beginning; MUTATES
shift()           -> remove from beginning; MUTATES
splice(...)       -> add/remove/replace; MUTATES
slice(start,end)  -> copy part of array; NON-MUTATING
indexOf(value)    -> returns index or -1
includes(value)   -> true/false
find(callback)    -> first matching element or undefined
length            -> number of elements
`);
