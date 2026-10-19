const textDemo = document.querySelector("#textDemo");
const htmlDemo = document.querySelector("#htmlDemo");

textDemo.textContent = "<strong>This is text, not HTML.</strong>";
htmlDemo.innerHTML = "<strong>This string becomes HTML.</strong>";

const input = document.querySelector("#nameInput");
const propertyOutput = document.querySelector("#propertyOutput");

document.querySelector("#updateInputBtn").addEventListener("click", () => {
  input.value = "Updated through the value property";
  propertyOutput.textContent = `Current input value: ${input.value}`;
});

const link = document.querySelector("#demoLink");

document.querySelector("#setAttrBtn").addEventListener("click", () => {
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
  link.setAttribute("aria-label", "Open Example website in a new tab");
});

document.querySelector("#removeAttrBtn").addEventListener("click", () => {
  link.removeAttribute("target");
  link.removeAttribute("rel");
});

const quoteCard = document.querySelector("#quoteCard");

document.querySelector("#datasetBtn").addEventListener("click", () => {
  quoteCard.dataset.author = "A. P. J. Abdul Kalam";
  quoteCard.dataset.category = "motivation";

  quoteCard.textContent =
    `${quoteCard.textContent} — ${quoteCard.dataset.author} [${quoteCard.dataset.category}]`;
});

document.querySelector("#imageBtn").addEventListener("click", () => {
  const image = document.querySelector("#demoImage");
  image.alt = "Updated accessible description of the sample image";
});

document.querySelector("#gradeBtn").addEventListener("click", () => {
  const score = Number(document.querySelector("#scoreInput").value);
  const output = document.querySelector("#gradeOutput");

  if (Number.isNaN(score) || score < 0 || score > 100) {
    output.textContent = "Enter a score from 0 to 100.";
    return;
  }

  if (score >= 80) output.textContent = "Grade: A";
  else if (score >= 60) output.textContent = "Grade: B";
  else if (score >= 40) output.textContent = "Grade: C";
  else output.textContent = "Grade: F";
});

document.querySelector("#safeBtn").addEventListener("click", () => {
  const userInput = document.querySelector("#userInput").value;
  document.querySelector("#safeOutput").textContent = userInput;
});
