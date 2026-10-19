function normalizeTitle(value) {
  if (typeof value !== "string") return null;

  const title = value.trim().replace(/\s+/g, " ");
  if (title.length === 0) return null;
  if (title.length > 120) return null;

  return title;
}

function createTask(title, id) {
  const normalizedTitle = normalizeTitle(title);
  if (!normalizedTitle) {
    return { ok: false, error: "Title must be 1–120 characters." };
  }
  if (typeof id !== "string" || id.trim() === "") {
    return { ok: false, error: "A task ID is required." };
  }

  return {
    ok: true,
    task: { id: id.trim(), title: normalizedTitle, completed: false }
  };
}

function markTaskComplete(tasks, taskId) {
  if (!Array.isArray(tasks)) {
    return { ok: false, error: "Tasks must be an array." };
  }
  if (taskId === null || taskId === undefined || taskId === "") {
    return { ok: false, error: "Task ID is required." };
  }
  if (!tasks.some(task => task.id === taskId)) {
    return { ok: false, error: "Task not found." };
  }

  return {
    ok: true,
    tasks: tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    )
  };
}

console.log(createTask("  Learn   JavaScript ", "task-1"));
console.log(createTask("   ", "task-2"));
console.log(markTaskComplete([{ id: "task-1", completed: false }], "task-1"));

module.exports = { normalizeTitle, createTask, markTaskComplete };
