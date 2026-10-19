# Lecture Notes: Conditionals & Decision Logic

## 1. Why conditionals?
Conditional statements allow a program to make decisions based on conditions.

Basic pattern:
```js
if (condition) {
  // runs when condition is true
}
```

### if
```js
let age = 20;

if (age >= 18) {
  console.log("Eligible to vote");
}
```

### if...else
```js
let marks = 72;

if (marks >= 40) {
  console.log("Pass");
} else {
  console.log("Fail");
}
```

### else if
Use `else if` when there are multiple mutually exclusive conditions.
```js
let marks = 86;

if (marks >= 90) {
  console.log("Grade A+");
} else if (marks >= 80) {
  console.log("Grade A");
} else if (marks >= 70) {
  console.log("Grade B");
} else if (marks >= 60) {
  console.log("Grade C");
} else {
  console.log("Needs improvement");
}
```

## 2. switch statements
`switch` is useful when one expression is compared against several fixed values.

```js
let day = 3;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Invalid day");
}
```

### Why break?
Without `break`, execution falls through to the following cases.

```js
let role = "admin";

switch (role) {
  case "admin":
    console.log("Full access");
    break;
  case "editor":
    console.log("Edit access");
    break;
  default:
    console.log("Read-only access");
}
```

### switch and strict matching
`switch` uses strict comparison semantics for case matching. Keep the case values consistent with the expression's type.

## 3. Ternary expressions
The ternary operator is a compact alternative for a simple two-way decision.

Syntax:
```js
condition ? valueIfTrue : valueIfFalse
```

Example:
```js
let age = 21;
let status = age >= 18 ? "Adult" : "Minor";

console.log(status);
```

Good use:
```js
let result = marks >= 40 ? "Pass" : "Fail";
```

Avoid deeply nested ternaries because they reduce readability. Use `if...else` when the decision becomes complex.

## 4. Nested decision logic
A conditional inside another conditional is a nested conditional.

```js
let age = 22;
let hasId = true;

if (age >= 18) {
  if (hasId) {
    console.log("Entry allowed");
  } else {
    console.log("ID required");
  }
} else {
  console.log("Entry denied");
}
```

Nested logic can be valid, but excessive nesting makes code harder to understand.

### Improve readability with combined conditions
```js
if (age >= 18 && hasId) {
  console.log("Entry allowed");
} else {
  console.log("Entry denied");
}
```

## 5. Guard clauses
A guard clause checks invalid or exceptional conditions early and returns immediately. This avoids unnecessary nesting.

```js
function processPayment(amount) {
  if (amount <= 0) {
    return "Invalid amount";
  }

  if (amount > 100000) {
    return "Amount exceeds limit";
  }

  return "Payment processed";
}

console.log(processPayment(500));
```

Instead of:
```js
function checkUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        return "Allowed";
      }
    }
  }

  return "Denied";
}
```

Prefer:
```js
function checkUser(user) {
  if (!user) return "Denied";
  if (!user.isActive) return "Denied";
  if (!user.hasPermission) return "Denied";

  return "Allowed";
}
```

Guard clauses are especially useful in functions.

## 6. Readable conditions

### Give conditions meaningful names
Instead of:
```js
if (age >= 18 && age <= 60 && income > 30000) {
  console.log("Eligible");
}
```

Use:
```js
const isWorkingAge = age >= 18 && age <= 60;
const hasRequiredIncome = income > 30000;

if (isWorkingAge && hasRequiredIncome) {
  console.log("Eligible");
}
```

### Prefer positive, clear conditions
Hard-to-read:
```js
if (!(isLoggedIn === false)) {
  // ...
}
```

Clear:
```js
if (isLoggedIn) {
  // ...
}
```

### Avoid unnecessary comparisons
Instead of:
```js
if (isActive === true) {
  console.log("Active");
}
```

Use:
```js
if (isActive) {
  console.log("Active");
}
```

## 7. Common mistake: assignment instead of comparison

Incorrect:
```js
let role = "admin";

if (role = "user") {
  console.log("User");
}
```

`=` assigns a value; it does not test equality.

Correct:
```js
if (role === "user") {
  console.log("User");
}
```

Use `===` for strict equality in normal application logic.

## 8. Common mistake: loose coercion

JavaScript can coerce values with `==`.

```js
console.log(5 == "5");   // true
console.log(5 === "5");  // false
```

Prefer strict equality:
```js
if (userInput === "5") {
  console.log("Correct");
}
```

If input is expected to be numeric, explicitly convert it:
```js
const age = Number("20");

if (age >= 18) {
  console.log("Adult");
}
```

## 9. Common mistake: incorrect ranges

This does NOT mean 18 <= age <= 60 in JavaScript:
```js
if (18 <= age <= 60) {
  // wrong
}
```

JavaScript evaluates it from left to right, so it does not behave like mathematical chained comparison.

Correct:
```js
if (age >= 18 && age <= 60) {
  console.log("Within range");
}
```

For an exclusive range:
```js
if (age > 18 && age < 60) {
  console.log("Strictly inside range");
}
```

## 10. Boundary conditions
Always decide whether boundaries are included.

Inclusive:
```js
if (marks >= 40 && marks <= 100) {
  console.log("Valid marks");
}
```

Exclusive:
```js
if (marks > 40 && marks < 100) {
  console.log("Inside range");
}
```

Also validate impossible values:
```js
if (marks < 0 || marks > 100) {
  console.log("Invalid marks");
}
```

## 11. Combining decisions with logical operators

### AND
Both conditions must be true.
```js
if (age >= 18 && hasLicense) {
  console.log("Can drive");
}
```

### OR
At least one condition must be true.
```js
if (isAdmin || isOwner) {
  console.log("Can manage");
}
```

### NOT
Reverses a boolean value.
```js
if (!isLoggedIn) {
  console.log("Please log in");
}
```

## 12. Practical example: result classification
```js
function getResult(marks) {
  if (marks < 0 || marks > 100) {
    return "Invalid marks";
  }

  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 40) return "D";

  return "F";
}

console.log(getResult(84)); // A
```

This example combines validation, ordered conditions and guard-style early returns.

## 13. Choosing the right construct

| Situation | Recommended construct |
|---|---|
| One simple condition | `if` |
| Two alternatives | `if...else` |
| Several ranges/complex conditions | `if...else if...else` |
| One value with fixed choices | `switch` |
| Simple two-value assignment | ternary |
| Invalid cases should stop a function early | guard clause |


