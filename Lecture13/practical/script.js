const body = document.body;
const themeToggle = document.querySelector("#themeToggle");
const themeName = document.querySelector("#themeName");
const faqButtons = document.querySelectorAll(".faq-question");

function updateThemeUI() {
  const dark = body.classList.contains("dark");

  themeName.textContent = dark ? "Dark" : "Light";
  themeToggle.textContent = dark ? "☀️ Light mode" : "🌙 Dark mode";
  themeToggle.setAttribute("aria-pressed", String(dark));

  localStorage.setItem("theme", dark ? "dark" : "light");
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
  }
  updateThemeUI();
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  updateThemeUI();
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answerId = button.getAttribute("aria-controls");
    const answer = document.getElementById(answerId);
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));
    answer.hidden = isExpanded;

    const icon = button.querySelector("[aria-hidden='true']");
    icon.textContent = isExpanded ? "+" : "−";
  });
});

loadTheme();
