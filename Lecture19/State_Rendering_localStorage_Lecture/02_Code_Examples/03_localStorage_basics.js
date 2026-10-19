// Open DevTools -> Console and run these examples on a normal webpage.

// Save
localStorage.setItem("studentName", "Asha");

// Read
const name = localStorage.getItem("studentName");
console.log(name);

// Remove one key
localStorage.removeItem("studentName");

// Save an object
const settings = {
  theme: "dark",
  fontSize: 18
};

localStorage.setItem("settings", JSON.stringify(settings));

// Read the object
const savedSettings = JSON.parse(localStorage.getItem("settings"));
console.log(savedSettings);

// WARNING: clear() removes all localStorage data for this origin.
// localStorage.clear();
