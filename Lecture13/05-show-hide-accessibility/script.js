const button = document.querySelector("#toggle");
const content = document.querySelector("#content");

button.addEventListener("click", () => {
  const isHidden = content.hidden;
  content.hidden = !isHidden;

  button.setAttribute("aria-expanded", String(isHidden));
  button.textContent = isHidden ? "Hide details" : "Show details";
});
