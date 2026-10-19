const box = document.querySelector("#box");

console.log("Current inline background:", box.style.backgroundColor);

document.querySelector("#styleBtn").addEventListener("click", () => {
  box.style.backgroundColor = "gold";
  box.style.color = "black";
  box.style.padding = "30px";
  box.style.borderRadius = "12px";

  console.log("Updated inline styles:", box.style.cssText);
});

// For the final computed value, including stylesheet rules:
console.log("Computed width:", getComputedStyle(box).width);
