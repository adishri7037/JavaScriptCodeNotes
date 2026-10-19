const STORAGE_KEY = "modular-task-board-v1";

export function loadTasks(fallbackTasks) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return fallbackTasks.map(task => ({ ...task }));
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : fallbackTasks.map(task => ({ ...task }));
  } catch {
    return fallbackTasks.map(task => ({ ...task }));
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function clearTasks() {
  localStorage.removeItem(STORAGE_KEY);
}
