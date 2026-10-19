const result = document.querySelector("#result");

function greetStudent(name, course) {
  result.textContent = `Hello ${name}! You are learning ${course}.`;
}

// WRONG:
// button.addEventListener("click", greetStudent("Aditya", "JavaScript"));
// This calls greetStudent immediately and passes its return value.
//
// CORRECT: use a wrapper function.
document.querySelector("#student1").addEventListener("click", function () {
  greetStudent("Student 1", "JavaScript");
});

document.querySelector("#student2").addEventListener("click", () => {
  greetStudent("Student 2", "JavaScript");
});

// The event object can still be passed explicitly:
function showKey(prefix, event) {
  console.log(prefix, event.key);
}

document.addEventListener("keydown", (event) => {
  showKey("Pressed:", event);
});
