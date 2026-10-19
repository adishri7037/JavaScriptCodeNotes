// PRACTICAL: Select and inspect elements on the profile page.

// Task 1: Select the profile section by ID.
const profile = document.getElementById("profile");
console.log("Profile:", profile);

// Task 2: Select the profile name using a class.
const name = document.querySelector(".profile-name");
console.log("Name:", name);

// Task 3: Select all headings.
const headings = document.querySelectorAll("h2");
console.log("Headings:", headings);

// Task 4: Select all skills.
const skills = document.querySelectorAll("#skill-list > .skill");
console.log("Skills:", skills);

// Task 5: Select the email using a CSS combination.
const email = document.querySelector("#profile .contact .email");
console.log("Email:", email);

// Task 6: Inspect important properties.
console.log("Name text:", name.textContent);
console.log("Name tag:", name.tagName);
console.log("Profile classes:", profile.className);

// Task 7: Count selected elements.
console.log("Number of skills:", skills.length);

// Task 8: Print each skill.
skills.forEach((skill, index) => {
  console.log(`Skill ${index + 1}: ${skill.textContent}`);
});

// EXTRA PRACTICE:
// 1. Select the city.
// 2. Select only <h2> elements inside #profile.
// 3. Select all paragraphs inside .contact.
// 4. Select all elements with class .skill.
// 5. Try an attribute selector: [class="skill"].
