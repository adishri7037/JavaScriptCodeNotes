const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");

let nextId = 1;

const tasks = [];

function renderTasks() {
  taskList.innerHTML = tasks.map((task) => `
    <li data-id="${task.id}" class="${task.completed ? "completed" : ""}">
      <span class="task-text">${escapeHTML(task.text)}</span>

      <div class="actions">
        <button type="button" data-action="toggle">
          ${task.completed ? "Undo" : "Complete"}
        </button>

        <button type="button" data-action="delete">
          Delete
        </button>
      </div>
    </li>
  `).join("");

  taskCount.textContent =
    `${tasks.length} task${tasks.length === 1 ? "" : "s"}`;
}

function escapeHTML(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (!text) return;

  tasks.push({
    id: nextId++,
    text,
    completed: false
  });

  taskInput.value = "";
  taskInput.focus();

  renderTasks();
});

// ONE delegated listener for all task actions.
taskList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button || !taskList.contains(button)) {
    return;
  }

  const item = button.closest("[data-id]");

  if (!item) return;

  const id = Number(item.dataset.id);
  const action = button.dataset.action;

  const task = tasks.find((task) => task.id === id);

  if (!task) return;

  if (action === "toggle") {
    task.completed = !task.completed;
  }

  if (action === "delete") {
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
  }

  renderTasks();
});

renderTasks();
