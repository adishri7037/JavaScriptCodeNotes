// Persistent Task Manager
// Architecture:
// state -> action -> save -> render

const STORAGE_KEY = "btech7-task-manager";

const DEFAULT_STATE = {
  version: 1,
  tasks: []
};

let state = loadState();

const elements = {
  form: document.querySelector("#taskForm"),
  input: document.querySelector("#taskInput"),
  list: document.querySelector("#taskList"),
  empty: document.querySelector("#emptyState"),
  count: document.querySelector("#taskCount"),
  clearCompleted: document.querySelector("#clearCompleted"),
  clearAll: document.querySelector("#clearAll"),
  message: document.querySelector("#storageMessage")
};

// Create a fresh default object instead of modifying DEFAULT_STATE.
function getDefaultState() {
  return {
    version: DEFAULT_STATE.version,
    tasks: []
  };
}

// Load and validate saved state.
function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return getDefaultState();
  }

  try {
    const parsed = JSON.parse(raw);

    // Basic schema validation/defaults.
    return {
      version: Number.isInteger(parsed.version) ? parsed.version : 1,
      tasks: Array.isArray(parsed.tasks)
        ? parsed.tasks.filter(isValidTask)
        : []
    };
  } catch (error) {
    console.error("Could not parse saved state:", error);
    return getDefaultState();
  }
}

function isValidTask(task) {
  return (
    task &&
    typeof task === "object" &&
    (typeof task.id === "string" || typeof task.id === "number") &&
    typeof task.title === "string" &&
    typeof task.completed === "boolean"
  );
}

// Save the whole application state.
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    showMessage("Saved.");
    return true;
  } catch (error) {
    console.error("Could not save state:", error);
    showMessage("Could not save data. Browser storage may be unavailable or full.");
    return false;
  }
}

function showMessage(text) {
  elements.message.textContent = text;

  window.clearTimeout(showMessage.timer);
  showMessage.timer = window.setTimeout(() => {
    elements.message.textContent = "";
  }, 1800);
}

// Render UI from state.
// The DOM is a view of state; state remains the source of truth.
function render() {
  elements.list.replaceChildren();

  const hasTasks = state.tasks.length > 0;
  elements.empty.hidden = hasTasks;

  const completedCount = state.tasks.filter(task => task.completed).length;
  elements.count.textContent =
    `${state.tasks.length} task${state.tasks.length === 1 ? "" : "s"} ` +
    `(${completedCount} completed)`;

  for (const task of state.tasks) {
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.taskId = String(task.id);

    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.title} as complete`);

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

    li.append(checkbox, title, deleteButton);
    elements.list.append(li);
  }
}

function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false
  };
}

function addTask(title) {
  state.tasks.push(createTask(title));
  saveState();
  render();
}

function toggleTask(taskId) {
  const task = state.tasks.find(task => String(task.id) === taskId);

  if (!task) return;

  task.completed = !task.completed;
  saveState();
  render();
}

function deleteTask(taskId) {
  state.tasks = state.tasks.filter(
    task => String(task.id) !== taskId
  );

  saveState();
  render();
}

function clearCompletedTasks() {
  state.tasks = state.tasks.filter(task => !task.completed);
  saveState();
  render();
}

function clearAllTasks() {
  if (state.tasks.length === 0) return;

  const confirmed = window.confirm("Delete all tasks?");
  if (!confirmed) return;

  state.tasks = [];
  saveState();
  render();
}

// Form submission.
elements.form.addEventListener("submit", event => {
  event.preventDefault();

  const title = elements.input.value.trim();

  if (!title) {
    elements.input.focus();
    return;
  }

  addTask(title);
  elements.form.reset();
  elements.input.focus();
});

// Event delegation: one listener handles dynamic task items.
elements.list.addEventListener("click", event => {
  const taskElement = event.target.closest(".task");

  if (!taskElement) return;

  const taskId = taskElement.dataset.taskId;

  if (event.target.matches("[data-action='delete']")) {
    deleteTask(taskId);
  }
});

elements.list.addEventListener("change", event => {
  if (!event.target.matches(".task-checkbox")) return;

  const taskElement = event.target.closest(".task");
  if (!taskElement) return;

  toggleTask(taskElement.dataset.taskId);
});

elements.clearCompleted.addEventListener("click", clearCompletedTasks);
elements.clearAll.addEventListener("click", clearAllTasks);

// Initial render.
render();
