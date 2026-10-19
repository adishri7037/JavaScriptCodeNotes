// 1. getElementById()
const heading = document.getElementById("mainHeading");
console.log("By ID:", heading);

// 2. getElementsByClassName()
// Returns an HTMLCollection.
const cards = document.getElementsByClassName("card");
console.log("Cards:", cards);
console.log("First card:", cards[0]);

// 3. getElementsByTagName()
const listItems = document.getElementsByTagName("li");
console.log("All <li> elements:", listItems);

// 4. querySelector()
// Returns the first matching element.
const firstCardTitle = document.querySelector(".card-title");
console.log("First card title:", firstCardTitle);

// 5. querySelectorAll()
// Returns a static NodeList containing all matches.
const allCardTitles = document.querySelectorAll(".card-title");
console.log("All card titles:", allCardTitles);

// NodeList supports forEach().
allCardTitles.forEach((title, index) => {
  console.log(index, title.textContent);
});

// CSS selector combinations
const profileName = document.querySelector("#mainHeading + .card .info");
console.log("Profile name:", profileName);

const skills = document.querySelectorAll("#skillsList > .skill");
console.log("Direct skill children:", skills);

// Inspect useful properties.
console.log("Heading text:", heading.textContent);
console.log("Heading tag:", heading.tagName);
console.log("Heading id:", heading.id);
console.log("Heading classes:", heading.className);
