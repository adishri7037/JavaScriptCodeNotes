const button = document.querySelector("#multiBtn");
const messages = document.querySelector("#messages");

function addMessage(text) {
  const li = document.createElement("li");
  li.textContent = text;
  messages.append(li);
}

button.addEventListener("click", function () {
  addMessage("Listener 1 executed.");
});

button.addEventListener("click", function () {
  addMessage("Listener 2 executed.");
});

button.addEventListener("click", function () {
  addMessage("Listener 3 executed.");
});

// All three listeners are registered for the same click event.
