# Objects, Data Modelling & Modern Syntax
### Object literal
An object is a collection of properties. A property has a key and a value. Values can be primitives, arrays, objects or functions.

### Dot vs bracket
`student.name` is convenient for a known identifier-style property.
`student["name"]` is useful when the property name is dynamic or contains characters that cannot be used with dot notation.

### Nested objects
Objects can contain other objects and arrays, allowing hierarchical data models.

### Object.keys / values / entries
- Object.keys(obj) -> array of keys
- Object.values(obj) -> array of values
- Object.entries(obj) -> array of [key, value] pairs

### Destructuring
Destructuring extracts values into variables:
`const { name, marks } = student;`
`const [first, second] = subjects;`

### Spread and rest
Spread expands values:
`const copy = { ...student };`
Rest collects remaining values:
`const { name, ...details } = student;`

Spread copying is shallow. Nested objects remain shared references.

### Constructor functions and this
Before class syntax became common, constructor functions were widely used:
`function Student(name) { this.name = name; }`
`new Student("Aman")` creates an instance.

### Classes
Classes provide a convenient syntax for defining constructors and methods. JavaScript classes still use the language's prototype-based object model underneath.

### Prototypes
Objects can inherit properties/methods through a prototype chain. Methods placed on a constructor's prototype can be shared among instances.

### extends and super
`extends` creates a subclass. `super(...)` calls the parent constructor; `super.method()` calls a parent method.

## Suggested teaching flow
1. Object literal
2. Property access
3. Nested objects
4. Arrays of objects
5. Object utility methods
6. Destructuring
7. Spread/rest
8. Constructor functions and this
9. Prototypes
10. Classes
11. Inheritance
12. Real-world modelling

## Common mistakes
- Using dot notation for a dynamic key.
- Confusing object references with copies.
- Assuming spread makes a deep copy.
- Forgetting `new` with a constructor function.
- Forgetting `super()` before using `this` in a derived class constructor.
- Using arrow functions when a method needs dynamic `this` behavior.
