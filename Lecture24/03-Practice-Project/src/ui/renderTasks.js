export function renderTasks(tasks, listElement, onToggle, onRemove) {
  listElement.replaceChildren();
  for (const task of tasks) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.title} complete`);
    checkbox.addEventListener("change", () => onToggle(task.id));

    const title = document.createElement("span");
    title.textContent = task.title;
    if (task.completed) title.className = "done";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => onRemove(task.id));

    li.append(checkbox, title, remove);
    listElement.append(li);
  }
}
