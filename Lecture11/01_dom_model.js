// Open this file through 01_dom_model.html.
// Use the browser DevTools Console to see the output.

console.log("document:", document);
console.log("document.title:", document.title);
console.log("document.body:", document.body);

// document.documentElement represents the <html> element.
console.log("Root HTML element:", document.documentElement);

// DOM tree inspection
console.log("Body children:", document.body.children);
console.log("Body first child:", document.body.firstElementChild);

// Inspect selected elements
const title = document.getElementById("page-title");
const profile = document.querySelector("#profile");

console.log("Title element:", title);
console.log("Profile section:", profile);
