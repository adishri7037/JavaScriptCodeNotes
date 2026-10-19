# JavaScript Arrays Cheat Sheet

## Create
```js
const fruits = ["Apple", "Banana", "Mango"];
const empty = [];
```

## Access
```js
fruits[0];
fruits[fruits.length - 1];
```

## Length
```js
fruits.length;
```

## Iterate
```js
for (const fruit of fruits) {
    console.log(fruit);
}
```

## Mutating Methods
```js
arr.push(value);
arr.pop();
arr.unshift(value);
arr.shift();
arr.splice(start, deleteCount, item1, item2);
```

## Non-mutating / Searching
```js
arr.slice(start, end);
arr.indexOf(value);
arr.includes(value);
arr.find(item => condition);
```

## Arrays of Records
```js
const students = [
    { id: 1, name: "Aman", marks: 80 },
    { id: 2, name: "Riya", marks: 92 }
];

const result = students.find(student => student.id === 2);
```

## Key Exam Point
`splice()` changes the original array, while `slice()` creates a new array containing a selected portion.
