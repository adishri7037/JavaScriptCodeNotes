// Event handler function
function sayHello() {
  document.querySelector("#message").textContent = "Hello! Button was clicked.";
}

// Register the handler.
// IMPORTANT: pass the function, do not call it.
document.querySelector("#helloBtn").addEventListener("click", sayHello);

// Inline-style alternative for comparison:
// helloBtn.onclick = sayHello;
//
// addEventListener() is generally preferred because multiple
// listeners can be attached to the same event.
