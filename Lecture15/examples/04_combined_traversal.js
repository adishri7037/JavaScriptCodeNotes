// Combining selection, traversal, content, attributes, classes and creation.

const list = document.querySelector("#taskList");

const task = document.createElement("li");
task.classList.add("task");
task.setAttribute("data-priority", "high");

const text = document.createElement("span");
text.textContent = "Learn DOM traversal";

const button = document.createElement("button");
button.type = "button";
button.textContent = "Remove";

task.append(text, button);
list.append(task);

list.addEventListener("click", (event) => {
  const removeButton = event.target.closest("button");

  if (!removeButton) return;

  const taskItem = removeButton.closest(".task");

  if (taskItem) {
    taskItem.remove();
  }
});
