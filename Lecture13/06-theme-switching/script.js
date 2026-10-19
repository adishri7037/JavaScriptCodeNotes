const themeButton = document.querySelector("#themeButton");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const dark = document.body.classList.contains("dark");
  themeButton.textContent = dark ? "Switch to Light" : "Switch to Dark";
});
