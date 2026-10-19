// PRACTICE SOLUTION
// The factory validates options once, then returns a validator that closes over them.
function createValidator(options = {}) {
  const {
    required = false,
    minLength,
    maxLength,
    pattern
  } = options;

  if (minLength !== undefined && minLength < 0) {
    throw new Error("minLength must be non-negative");
  }
  if (maxLength !== undefined && maxLength < 0) {
    throw new Error("maxLength must be non-negative");
  }
  if (minLength !== undefined && maxLength !== undefined && minLength > maxLength) {
    throw new Error("minLength cannot exceed maxLength");
  }
  if (pattern !== undefined && !(pattern instanceof RegExp)) {
    throw new TypeError("pattern must be a RegExp");
  }

  return function validate(value) {
    const errors = [];
    const empty = value === null || value === undefined || value === "";

    if (required && empty) {
      errors.push("This field is required.");
      return { valid: false, errors };
    }

    // Optional empty values pass other checks unless required is true.
    if (empty) return { valid: true, errors };

    const text = String(value);

    if (minLength !== undefined && text.length < minLength) {
      errors.push(`Must contain at least ${minLength} characters.`);
    }
    if (maxLength !== undefined && text.length > maxLength) {
      errors.push(`Must contain no more than ${maxLength} characters.`);
    }
    if (pattern !== undefined) {
      // Reset state for global/sticky regular expressions.
      pattern.lastIndex = 0;
      if (!pattern.test(text)) errors.push("Format is invalid.");
      pattern.lastIndex = 0;
    }

    return { valid: errors.length === 0, errors };
  };
}

function createPrivateCounter(start = 0) {
  if (!Number.isFinite(start)) throw new TypeError("start must be a finite number");
  let count = start;

  return Object.freeze({
    increment(step = 1) {
      if (!Number.isFinite(step)) throw new TypeError("step must be finite");
      count += step;
      return count;
    },
    decrement(step = 1) {
      if (!Number.isFinite(step)) throw new TypeError("step must be finite");
      count -= step;
      return count;
    },
    reset() {
      count = start;
      return count;
    },
    getValue() {
      return count;
    }
  });
}

// Examples and checks
const usernameValidator = createValidator({
  required: true,
  minLength: 3,
  maxLength: 12,
  pattern: /^[a-z0-9_]+$/i
});

console.log("Username tests:");
console.log(usernameValidator("aditya")); // valid: true
console.log(usernameValidator("ab"));     // too short
console.log(usernameValidator("name!"));  // invalid format
console.log(usernameValidator(""));       // required error

const counter = createPrivateCounter(5);
console.log("\nCounter tests:");
console.log(counter.getValue()); // 5
console.log(counter.increment()); // 6
console.log(counter.increment(4)); // 10
console.log(counter.decrement(2)); // 8
console.log(counter.reset()); // 5
console.log(counter.count); // undefined: private state is not exposed

// Additional assertions
const assert = require("node:assert/strict");
assert.equal(usernameValidator("abc").valid, true);
assert.equal(usernameValidator("ab").valid, false);
assert.equal(usernameValidator("bad!").valid, false);
assert.equal(counter.increment(), 6);
assert.equal(counter.getValue(), 6);
assert.equal(counter.reset(), 5);
console.log("\nAll assertions passed.");
