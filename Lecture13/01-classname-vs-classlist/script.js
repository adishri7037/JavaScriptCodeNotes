const card = document.querySelector("#card");

// className reads/writes the complete class attribute.
console.log("Initial className:", card.className);

card.className = "card highlight";
console.log("After className assignment:", card.className);

// classList works with individual classes.
card.classList.add("rounded");
console.log("classList:", card.classList);

// Prefer classList when adding/removing one state without replacing other classes.
card.classList.remove("highlight");
card.classList.toggle("highlight");
console.log("Has highlight?", card.classList.contains("highlight"));
