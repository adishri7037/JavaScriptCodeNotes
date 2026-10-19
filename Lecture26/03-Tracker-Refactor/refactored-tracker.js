// Node-runnable demonstration of tracker logic and safe storage handling.
const { createMemoryStorage, readJson, writeJson } = require("../02-Examples/storage-utils");
const { normalizeTitle } = require("../02-Examples/clean-code");

const STORAGE_KEY = "tracker.tasks";

function createTask(title, id) {
  const normalizedTitle = normalizeTitle(title);
  if (!normalizedTitle) {
    return { ok: false, error: "Enter a title between 1 and 120 characters." };
  }
  return {
    ok: true,
    task: { id, title: normalizedTitle, completed: false }
  };
}

function addTask(tasks, title, id) {
  if (!Array.isArray(tasks)) return { ok: false, error: "Task state is invalid." };
  const result = createTask(title, id);
  if (!result.ok) return result;
  return { ok: true, tasks: [...tasks, result.task] };
}

function setTaskCompleted(tasks, taskId, completed = true) {
  if (!Array.isArray(tasks)) return { ok: false, error: "Task state is invalid." };
  if (taskId === undefined || taskId === null || taskId === "") {
    return { ok: false, error: "Task ID is required." };
  }
  if (!tasks.some(task => task.id === taskId)) {
    return { ok: false, error: "Task not found." };
  }
  return {
    ok: true,
    tasks: tasks.map(task =>
      task.id === taskId ? { ...task, completed: Boolean(completed) } : task
    )
  };
}

function deleteTask(tasks, taskId) {
  if (!Array.isArray(tasks)) return { ok: false, error: "Task state is invalid." };
  if (!tasks.some(task => task.id === taskId)) {
    return { ok: false, error: "Task not found." };
  }
  return { ok: true, tasks: tasks.filter(task => task.id !== taskId) };
}

function saveTasks(storage, tasks) {
  return writeJson(storage, STORAGE_KEY, tasks);
}

function loadTasks(storage) {
  const value = readJson(storage, STORAGE_KEY, []);
  // Stored values are external input: reject a shape that the app cannot use.
  if (!Array.isArray(value)) return [];
  return value.filter(task =>
    task &&
    (typeof task.id === "string" || typeof task.id === "number") &&
    typeof task.title === "string" &&
    typeof task.completed === "boolean"
  );
}

// Demonstration
const storage = createMemoryStorage();
let tasks = loadTasks(storage);

let result = addTask(tasks, "  Review   JavaScript ", "task-1");
if (result.ok) {
  tasks = result.tasks;
  console.log("Added:", tasks[0]);
}

result = setTaskCompleted(tasks, "task-1");
if (result.ok) tasks = result.tasks;
console.log("Completed:", tasks[0].completed); // true

console.log("Save succeeded:", saveTasks(storage, tasks)); // true
console.log("Reloaded:", loadTasks(storage));

result = addTask(tasks, "    ", "task-2");
console.log("Invalid title:", result); // clear validation error

module.exports = {
  createTask, addTask, setTaskCompleted, deleteTask, saveTasks, loadTasks
};
