const panel = document.querySelector("#panel");

document.querySelector("#success").addEventListener("click", () => {
  panel.classList.remove("is-error");
  panel.classList.add("is-success");
});

document.querySelector("#error").addEventListener("click", () => {
  panel.classList.remove("is-success");
  panel.classList.add("is-error");
});
