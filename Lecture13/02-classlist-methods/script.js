const box = document.querySelector("#box");

document.querySelector("#add").addEventListener("click", () => {
  box.classList.add("active");
});

document.querySelector("#remove").addEventListener("click", () => {
  box.classList.remove("active");
});

document.querySelector("#toggle").addEventListener("click", () => {
  box.classList.toggle("large");
});

document.querySelector("#replace").addEventListener("click", () => {
  box.classList.replace("large", "active");
});

console.log("Contains active?", box.classList.contains("active"));
