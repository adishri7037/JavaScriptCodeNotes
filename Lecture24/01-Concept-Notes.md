# ES Modules & Code Organization — Complete Concept Notes

## 1. Why modular code matters
A module is a file that owns a focused responsibility and exposes a deliberate public interface. Modular code improves:
- **Separation of concerns:** UI rendering, API requests, data, and storage do not all live in one file.
- **Maintainability:** smaller files are easier to read and change.
- **Reusability:** utilities can be imported by multiple features.
- **Testing:** logic can be tested separately from the DOM.
- **Encapsulation:** module-scoped variables are not automatically added to `window`.
- **Collaboration:** developers can work on distinct modules with fewer conflicts.

A useful rule: each module should have a clear reason to change. Avoid splitting every tiny statement into its own file; organize around cohesive responsibilities.

## 2. What is an ES module?
ECMAScript modules (ESM) are JavaScript's standard module system. Files can export values and import values from other modules.

Browser entry point:
```html
<script type="module" src="./src/main.js"></script>
```
Modules are automatically deferred in browsers, use strict mode, and have their own scope. Static imports/exports are resolved before the module body executes.

## 3. Named exports and imports
A module can export multiple named values:
```js
// math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export function subtract(a, b) { return a - b; }
```
Import the exact exported names:
```js
import { add, multiply } from "./math.js";
console.log(add(2, 3));
```
Aliases:
```js
import { multiply as times } from "./math.js";
```
Export declarations can appear alongside declarations or at the end:
```js
const TAX_RATE = 0.18;
function calculateTax(amount) { return amount * TAX_RATE; }
export { TAX_RATE, calculateTax };
```

## 4. Default exports
A module may have one default export:
```js
// logger.js
export default function logMessage(message) {
  console.log(message);
}
```
Import without braces; the local name is chosen by the importer:
```js
import logger from "./logger.js";
logger("Ready");
```
A default export can coexist with named exports:
```js
export const VERSION = "1.0";
export default function start() {}
```
Import both:
```js
import start, { VERSION } from "./app.js";
```

### Named vs default
| Named export | Default export |
|---|---|
| Uses `{ }` in import syntax | No braces for the default binding |
| Import name normally matches export name; `as` can alias | Importer chooses local name |
| Multiple named exports per module | At most one default export |
| Useful for utilities/constants/functions | Useful when a module has one primary value |

Prefer named exports for many shared utilities because imports are explicit. Use a default export when the file has one obvious primary value. Consistency matters more than a universal rule.

## 5. Import path rules
Relative imports:
- `./utils.js` — current directory
- `../data/tasks.js` — parent directory, then `data/tasks.js`
- `/src/main.js` — from the web server's root
- Bare specifiers such as `react` generally require a bundler or import map in browsers.

Use explicit file extensions in native browser ESM imports:
```js
import { getTasks } from "./api/tasks.js";
```
Paths are resolved relative to the importing module's URL, not necessarily the HTML file. Paths and filename casing must match exactly, especially on Linux servers.

Avoid using Windows backslashes in import paths. Use `/`.

## 6. Browser module script rules
```html
<script type="module" src="./src/main.js"></script>
```
Important facts:
- Modules are deferred automatically; `defer` is not needed.
- Module scripts use strict mode.
- Top-level declarations are module-scoped, not automatically globals on `window`.
- Browsers enforce CORS for module loading.
- Opening HTML directly with `file://` often causes module/CORS errors. Use a local development server.
- Serve JavaScript with a valid JavaScript MIME type.
- Modules are cached by URL during page loading; avoid duplicate script tags that start the app twice.

## 7. Module scope and avoiding globals
In a classic script, top-level `var` may become a property of `window`. In an ES module, top-level declarations stay in module scope.

Avoid:
```js
window.currentUser = {};
window.tasks = [];
```
Prefer:
```js
const tasks = [];
function addTask(task) { tasks.push(task); }
export { addTask };
```
Only expose what another module needs. Keep implementation details private. The browser's `window` should not be used as an application-wide data bucket.

## 8. Organizing data, UI, storage, and API utilities
One practical structure:
```text
project/
  index.html
  src/
    main.js          # application entry point / event wiring
    data/
      initialTasks.js # seed/sample data
    ui/
      renderTasks.js  # DOM rendering
    storage/
      taskStorage.js  # localStorage read/write
    api/
      taskApi.js      # API requests
    utils/
      formatDate.js   # reusable pure helper
```
Responsibilities:
- **Data:** seed values, constants, domain transformations.
- **UI:** DOM elements, rendering, event display; avoid network/storage logic where possible.
- **Storage:** serialization and localStorage access.
- **API:** `fetch`, HTTP checks, JSON parsing, network errors.
- **Main:** wires modules together and starts the app.
- **Utilities:** small reusable functions without unrelated side effects.

Avoid circular dependencies, where A imports B and B imports A. They complicate initialization and reasoning.

## 9. localStorage module example
```js
const KEY = "tasks";
export function readTasks() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
export function writeTasks(tasks) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}
```
Storage is synchronous and browser-specific. Handle invalid stored JSON and consider privacy/security: do not store passwords or sensitive secrets in localStorage.

## 10. API utility module example
```js
export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
```
A module can centralize HTTP checks and parsing so UI components do not repeat them.

## 11. Dynamic imports
`import()` loads a module dynamically and returns a Promise:
```js
button.addEventListener("click", async () => {
  const { openDialog } = await import("./ui/dialog.js");
  openDialog();
});
```
Use it for optional or lazily loaded features. Static `import` must be at the top level; dynamic `import()` can be used in expressions.

## 12. Common mistakes
- Forgetting `type="module"` in the HTML.
- Omitting `.js` in native browser import paths.
- Using the wrong relative path or filename case.
- Opening a module-based project via `file://` rather than a local server.
- Importing a named export as default or vice versa.
- Creating circular dependencies.
- Putting everything on `window`.
- Mixing UI, storage, API and business logic in one huge file.
- Forgetting that module top-level `this` is `undefined`.
- Assuming localStorage works in every runtime (it is a browser API).

## 13. Refactoring strategy
1. Identify responsibilities in the existing file.
2. Extract pure data/constants first.
3. Extract storage read/write functions.
4. Extract API calls and error handling.
5. Extract DOM rendering into UI functions.
6. Keep event wiring and startup in `main.js`.
7. Add imports/exports with explicit paths.
8. Run through a local server and test each user flow.
9. Remove obsolete global variables and duplicate logic.

## 14. Quick revision
- `export` exposes selected values; `import` consumes them.
- Named imports use braces; default imports do not.
- Native browser imports use valid URLs, usually explicit `.js` extensions.
- `<script type="module">` enables browser ESM.
- Module declarations are scoped to their file.
- Separate data, UI, storage, API, and app startup responsibilities.
