// 1. COUNTER
let count = 0;

const countText = document.querySelector("#count");
const increaseBtn = document.querySelector("#increase");
const decreaseBtn = document.querySelector("#decrease");
const resetBtn = document.querySelector("#reset");

function renderCount() {
  countText.textContent = count;
}

increaseBtn.addEventListener("click", () => {
  count++;
  renderCount();
});

decreaseBtn.addEventListener("click", () => {
  count--;
  renderCount();
});

resetBtn.addEventListener("click", () => {
  count = 0;
  renderCount();
});
// 2. LIKE BUTTONS
const likeButtons = document.querySelectorAll(".likeBtn");

likeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // currentTarget is the button that owns this listener.
    const currentButton = event.currentTarget;
    const countElement = currentButton.querySelector(".likeCount");

    const currentLikes = Number(countElement.textContent);
    countElement.textContent = currentLikes + 1;
  });
});

// 3. KEYBOARD INTERACTION
const keyBox = document.querySelector("#keyBox");

document.addEventListener("keydown", (event) => {
  keyBox.textContent = `Key: ${event.key} | Code: ${event.code}`;

  if (event.key === "ArrowUp") {
    keyBox.textContent += " → Move Up";
  }

  if (event.key === "ArrowDown") {
    keyBox.textContent += " → Move Down";
  }

  if (event.key === "Enter") {
    keyBox.textContent += " → Enter pressed";
  }

  if (event.code === "Space") {
    // Prevent page scrolling when Space is pressed.
    event.preventDefault();
    keyBox.textContent += " → Space pressed";
  }
});

// 4. INPUT EVENT
const nameInput = document.querySelector("#name");
const preview = document.querySelector("#preview");

nameInput.addEventListener("input", (event) => {
  preview.textContent = `Preview: ${event.target.value}`;
});


