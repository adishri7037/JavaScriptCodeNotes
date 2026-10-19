// A minimal in-memory mock makes the example runnable in Node.js.
// In a browser, pass window.localStorage or window.sessionStorage.
function createMemoryStorage() {
  const data = new Map();
  return {
    getItem(key) { return data.has(String(key)) ? data.get(String(key)) : null; },
    setItem(key, value) { data.set(String(key), String(value)); },
    removeItem(key) { data.delete(String(key)); },
    clear() { data.clear(); }
  };
}

function readJson(storage, key, fallback) {
  try {
    const raw = storage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const storage = createMemoryStorage();
console.log(readJson(storage, "tasks", [])); // []
console.log(writeJson(storage, "tasks", [{ id: 1, title: "Study" }])); // true
console.log(readJson(storage, "tasks", [])); // [{ id: 1, title: "Study" }]
storage.setItem("broken", "{not valid JSON");
console.log(readJson(storage, "broken", [])); // []

// In a browser:
// const persistent = window.localStorage;
// const tabOnly = window.sessionStorage;

module.exports = { readJson, writeJson, createMemoryStorage };
