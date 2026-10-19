// FOR...OF
// Iterates over VALUES of an iterable such as an array or string.

const fruits = ["Apple", "Banana", "Mango"];

for (const fruit of fruits) {
  console.log(fruit);
}

// String example
for (const ch of "JavaScript") {
  console.log(ch);
}


// FOR...IN
// Iterates over ENUMERABLE PROPERTY KEYS.
// With an object, these are property names.

const student = {
  name: "Aman",
  age: 21,
  branch: "CSE"
};

for (const key in student) {
  console.log(key, "=>", student[key]);
}

// For arrays, for...of is generally clearer when you need values.
// for...in gives indexes/keys, so it should not be confused with for...of.

const numbers = [10, 20, 30];

for (const index in numbers) {
  console.log("index:", index, "value:", numbers[index]);
}
