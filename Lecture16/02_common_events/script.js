const clickBtn = document.querySelector("#clickBtn");
const textInput = document.querySelector("#textInput");
const courseSelect = document.querySelector("#courseSelect");
const demoForm = document.querySelector("#demoForm");
const keyStatus = document.querySelector("#keyStatus");
const log = document.querySelector("#log");

clickBtn.addEventListener("click", function () {
  log.textContent = "click event fired";
});

textInput.addEventListener("input", function (event) {
  // input fires whenever the current value changes while typing.
  document.querySelector("#inputValue").textContent = event.target.value;
});

courseSelect.addEventListener("change", function (event) {
  document.querySelector("#selectedCourse").textContent =
    `Selected: ${event.target.value || "Nothing"}`;
});

demoForm.addEventListener("submit", function (event) {
  // Stop the normal form navigation/reload.
  event.preventDefault();

  const name = document.querySelector("#nameInput").value.trim();
  log.textContent = name ? `Form submitted for ${name}` : "Name is required.";
});

document.addEventListener("keydown", function (event) {
  keyStatus.textContent = `Key: ${event.key} | Code: ${event.code}`;
});

document.addEventListener("keyup", function (event) {
  console.log("keyup:", event.key);
});
