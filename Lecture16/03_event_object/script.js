const card = document.querySelector("#card");
const innerButton = document.querySelector("#innerButton");
const output = document.querySelector("#output");

card.addEventListener("click", function (event) {
  // target = element that actually started the event
  // currentTarget = element whose listener is currently running
  output.textContent =
    `target: ${event.target.id} | currentTarget: ${event.currentTarget.id}`;
});

innerButton.addEventListener("click", function (event) {
  console.log("event type:", event.type);
  console.log("target:", event.target);
  console.log("currentTarget:", event.currentTarget);
  console.log("mouse coordinates:", event.clientX, event.clientY);
});
