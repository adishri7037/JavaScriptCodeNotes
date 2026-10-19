# Browser Storage, Clean Code & Defensive Programming

## 1. `localStorage` recap

`localStorage` is a browser key/value storage API that persists data across page reloads and browser restarts for the same origin, until it is cleared or removed. It stores **strings**, not JavaScript objects.

```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme"); // "dark"
localStorage.removeItem("theme");
localStorage.clear(); // removes all keys for this origin — use carefully
```

### Storing objects and arrays
Serialize structured values with `JSON.stringify()` and parse them with `JSON.parse()`.

```js
const preferences = { theme: "dark", compactMode: true };
localStorage.setItem("preferences", JSON.stringify(preferences));

const raw = localStorage.getItem("preferences");
const loaded = raw === null ? null : JSON.parse(raw);
console.log(loaded?.theme); // "dark"
```

`getItem()` returns `null` when the key does not exist. A stored string `"null"` is different from a missing key.

### Limitations and safety
- Storage is synchronous; large or frequent operations can block the main thread.
- Storage can be unavailable or throw, for example due to browser policy or quota limits.
- Data is not a secure vault. Do not store passwords, session secrets, or sensitive data unnecessarily.
- Same-origin scripts can access the same storage. A cross-site scripting (XSS) vulnerability can expose stored data.
- Do not trust stored values: they can be stale, malformed, manually edited, or created by an older app version.
- Storage is origin-scoped (scheme, host, and port). Different origins do not share the same storage area.

## 2. `localStorage` vs `sessionStorage`

| Feature | `localStorage` | `sessionStorage` |
|---|---|---|
| Lifetime | Persists until removed/cleared | Usually ends when the tab's page session ends |
| Scope | Same origin | Same origin and top-level browsing context/tab |
| Reload | Data remains | Data remains |
| New tab | Normally shares same origin's local storage | Separate session storage area |
| API | `setItem`, `getItem`, `removeItem`, `clear` | Same API |
| Values | Strings | Strings |

Use `localStorage` for durable, non-sensitive preferences or a small draft that should survive browser restarts. Use `sessionStorage` for temporary per-tab state such as a multi-step flow that should not persist after the tab session. Neither is appropriate for secrets.

## 3. Robust storage helpers

Handle missing values and malformed JSON deliberately.

```js
function readJson(storage, key, fallback) {
  try {
    const raw = storage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    // Storage access and JSON parsing can both fail.
    return fallback;
  }
}

function writeJson(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    // The caller can display a warning or use in-memory state.
    return false;
  }
}
```

A fallback should be chosen intentionally. Avoid silently turning invalid data into a plausible but incorrect value when data loss matters. For critical workflows, surface the error and offer recovery.

## 4. Default values

A default is a value used when an input is absent or not usable. Choose the mechanism that matches the requirement.

### Default parameters
```js
function createLabel(text = "Untitled") {
  return text;
}
createLabel();          // "Untitled"
createLabel(undefined); // "Untitled"
createLabel("");        // ""
createLabel(null);      // null
```

Default parameters apply when an argument is omitted or `undefined`, not when it is `null`, `false`, `0`, or an empty string.

### Logical OR (`||`)
```js
const pageSize = suppliedPageSize || 20;
```
This uses `20` for any falsy value, including `0`, `false`, `""`, `null`, `undefined`, and `NaN`. This can accidentally replace valid values.

### Nullish coalescing (`??`)
```js
const pageSize = suppliedPageSize ?? 20;
```
This uses `20` only for `null` or `undefined`. Prefer `??` when zero, false, or an empty string may be valid data.

### Validate type and range separately
```js
function normalizePageSize(value) {
  if (value === undefined || value === null) return 20;
  if (!Number.isInteger(value) || value < 1 || value > 100) {
    throw new RangeError("page size must be an integer from 1 to 100");
  }
  return value;
}
```

Do not confuse “default missing value” with “accept every value.”

## 5. Clean code: naming

Names should reveal intent, not implementation trivia.

```js
// Unclear
function calc(a, b) { return a - b; }

// Clear
function calculateRemainingTasks(totalTasks, completedTasks) {
  return totalTasks - completedTasks;
}
```

Guidelines:
- Use descriptive nouns for values: `taskTitle`, `savedTasks`.
- Use verbs for actions: `saveTask`, `validateTitle`.
- Use booleans that read like questions: `isComplete`, `hasPermission`, `canSubmit`.
- Be consistent with casing (commonly `camelCase` for variables/functions and `PascalCase` for classes).
- Avoid cryptic abbreviations unless they are widely understood.
- Avoid names that promise more than the function does.

## 6. Function size and single responsibility

A function should have one clear reason to change. “Single responsibility” does not mean every function must be tiny; it means the function has a cohesive purpose and an understandable contract.

Instead of one function that reads form values, validates, writes storage, changes the DOM, and displays errors, separate those responsibilities:

```js
function validateTaskTitle(title) {
  return typeof title === "string" && title.trim().length > 0;
}

function createTask(title, id = createTaskId()) {
  return { id, title: title.trim(), completed: false };
}

function saveTasks(storage, tasks) {
  return writeJson(storage, "tracker.tasks", tasks);
}

function addTaskFromInput(inputValue, tasks, storage) {
  if (!validateTaskTitle(inputValue)) {
    return { ok: false, message: "Enter a task title." };
  }

  const nextTasks = [...tasks, createTask(inputValue)];
  const saved = saveTasks(storage, nextTasks);
  if (!saved) return { ok: false, message: "Could not save tasks." };

  return { ok: true, tasks: nextTasks };
}
```

Keep I/O at the edges. Pure functions such as `validateTaskTitle` and `createTask` are easy to test; storage and DOM operations are side effects that can be handled separately.

## 7. Guard clauses

A guard clause checks an invalid or special condition early and exits before the main logic. It reduces deeply nested `if` blocks.

```js
function getTaskLabel(task) {
  if (!task) return "Unknown task";
  if (typeof task.title !== "string") return "Untitled";
  if (!task.title.trim()) return "Untitled";
  return task.title.trim();
}
```

For operations where invalid input should be an error, throw or return an explicit error result instead of silently continuing:

```js
function completeTask(tasks, taskId) {
  if (!Array.isArray(tasks)) {
    throw new TypeError("tasks must be an array");
  }
  if (taskId === undefined || taskId === null || taskId === "") {
    throw new TypeError("taskId is required");
  }

  const exists = tasks.some(task => task.id === taskId);
  if (!exists) return { ok: false, reason: "Task not found" };

  return {
    ok: true,
    tasks: tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    )
  };
}
```

Choose a consistent error strategy: thrown exceptions for programmer/API contract violations, and result objects for expected user-facing failures.

## 8. Input sanitation and validation

**Validation** asks whether input meets the rules. **Sanitization/normalization** transforms input into an accepted representation. They are related but not interchangeable.

```js
function normalizeTitle(value) {
  if (typeof value !== "string") return null;
  const title = value.trim().replace(/\s+/g, " ");
  if (title.length === 0) return null;
  if (title.length > 120) return null;
  return title;
}
```

Important:
- Validate at boundaries: form input, API responses, imported files, and storage reads.
- Validate type, requiredness, length, range, and format.
- Use context-appropriate output encoding when rendering untrusted text. For browser text, prefer `textContent` over assigning untrusted strings to `innerHTML`.
- Never rely on client-side validation alone for security-sensitive server operations.
- Avoid destructive “sanitization” that silently changes user intent. Explain rejected input or return clear errors.
- Regexes can help with format validation, but complex patterns may be hard to maintain.

### Safe DOM rendering
```js
function renderTitle(element, title) {
  element.textContent = title; // treats the title as text
}
```

Avoid:
```js
// Unsafe for untrusted user input:
element.innerHTML = title;
```

## 9. Comments: explain why, not what

Comments should capture intent, constraints, non-obvious decisions, or a warning about a surprising behavior. The code should communicate ordinary mechanics.

```js
// Good: Explain why we avoid reusing a stale draft after the schema changes.
const draft = readJson(storage, key, null);
```

```js
// Weak: Repeats the code.
// Add one to count.
count += 1;
```

Useful comments answer:
- Why is this workaround necessary?
- Which invariant must remain true?
- Why was this tradeoff chosen?
- What external API behavior is surprising?
- What must a future maintainer not accidentally remove?

Update comments when behavior changes. Incorrect comments are worse than no comments.

## 10. Tracker-app refactoring workflow

1. **Observe before changing:** identify behavior, UI states, storage keys, and edge cases.
2. **Create a checklist:** loading, empty state, add task, complete task, delete task, reload persistence, malformed storage, invalid input.
3. **Separate concerns:** storage, validation/normalization, task state operations, and rendering.
4. **Add guards:** reject invalid titles and invalid task IDs.
5. **Use immutable updates:** create new arrays/objects instead of mutating shared data.
6. **Handle failure:** storage may be blocked or full; do not pretend a save succeeded.
7. **Render safely:** use `textContent` for user-controlled text.
8. **Test behavior:** compare before/after behavior, and ensure refactoring does not change intended features.

## 11. Refactoring review checklist

- [ ] Names communicate purpose.
- [ ] Each function has one cohesive responsibility.
- [ ] Defaults are intentional and do not hide invalid values.
- [ ] Guard clauses handle invalid inputs early.
- [ ] Inputs are normalized and validated at boundaries.
- [ ] JSON parsing and storage writes can fail safely.
- [ ] UI rendering does not inject untrusted HTML.
- [ ] Comments explain reasoning or constraints.
- [ ] State updates are predictable.
- [ ] Tests cover empty, malformed, and normal cases.
