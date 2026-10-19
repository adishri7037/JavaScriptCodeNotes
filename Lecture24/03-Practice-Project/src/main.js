import { initialTasks } from "./data/initialTasks.js";
import { loadTasks, saveTasks, clearTasks } from "./storage/taskStorage.js";
import { renderTasks } from "./ui/renderTasks.js";

const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const list = document.querySelector("#taskList");
const status = document.querySelector("#status");
const resetButton = document.querySelector("#reset");

let tasks = loadTasks(initialTasks);

function refresh(message = `${tasks.length} task(s)`) {
  renderTasks(tasks, list, toggleTask, removeTask);
  status.textContent = message;
  try { saveTasks(tasks); }
  catch { status.textContent = "Tasks updated, but browser storage is unavailable."; }
}

function toggleTask(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  refresh("Task status updated.");
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  refresh("Task deleted.");
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) { status.textContent = "Enter a task title."; return; }
  const id = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
  tasks = [...tasks, { id, title, completed: false }];
  input.value = "";
  refresh("Task added.");
});

resetButton.addEventListener("click", () => {
  clearTasks();
  tasks = initialTasks.map(task => ({ ...task }));
  refresh("Sample data restored.");
});

renderTasks(tasks, list, toggleTask, removeTask);
status.textContent = "Tasks loaded.";
