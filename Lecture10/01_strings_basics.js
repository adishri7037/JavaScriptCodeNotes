// String basics and immutability

let name = "Aditya";
// Strings are immutable: methods create a new string;
let upperName = name.toUpperCase();
console.log("Original:", name);
console.log("New string:", upperName);
// Common methods
let text = "  JavaScript is Powerful  ";
console.log(text.length);
console.log(text.trim());
console.log(text.toLowerCase());
console.log(text.toUpperCase());
console.log(text.includes("Script"));
console.log(text.startsWith("  Java"));
console.log(text.endsWith("  "));
console.log(text.indexOf("Script"));
console.log(text.slice(2, 12));
console.log(text.substring(2, 12));
console.log(text.replace("Powerful", "Flexible"));
console.log(text.split(" ")); 
let firstName = "Aman";
let marks = 87;
console.log(firstName + " scored " + marks);
console.log(`${firstName} scored ${marks}`);
