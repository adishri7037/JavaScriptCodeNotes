const link = document.querySelector("#demoLink");
const form = document.querySelector("#loginForm");
const status = document.querySelector("#status");

link.addEventListener("click", function (event) {
  // A link normally navigates to its href.
  event.preventDefault();
  status.textContent = "Navigation prevented. We stayed on this page.";
});

form.addEventListener("submit", function (event) {
  // A form normally submits and may reload/navigate.
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  status.textContent = email
    ? `Handled form submission for ${email}`
    : "Please enter an email.";
});
