# Important Questions: ES Modules & Code Organization

## Concepts
1. **What is a module?** A file with its own scope that can expose selected values through exports.
2. **Why modularize code?** Improve maintainability, reuse, testing, collaboration, and separation of concerns.
3. **What is an ES module?** JavaScript's standard `import`/`export` module system.
4. **What is a named export?** An explicitly named value imported with braces, such as `import { add } from './math.js'`.
5. **What is a default export?** A module's single primary default value imported without braces.
6. **Can a module have multiple named exports?** Yes.
7. **Can a module have multiple default exports?** No, only one default export per module.
8. **Can named and default exports coexist?** Yes.
9. **How do you alias a named import?** `import { add as sum } from './math.js'`.
10. **What does `type="module"` do?** Loads the script as an ES module, enabling imports/exports and module scope.
11. **Are module scripts deferred?** Yes, browser module scripts are deferred by default.
12. **Why use `.js` in browser imports?** Native browser ESM expects a resolvable URL; explicit extensions avoid common path failures.
13. **What does `./` mean?** Resolve relative to the importing module's URL.
14. **What does `../` mean?** Go to the parent directory before resolving the rest of the path.
15. **Why can modules fail under `file://`?** Browser security and CORS restrictions can block module loading; use a local HTTP server.
16. **Do module variables become `window` properties?** No, top-level declarations are module-scoped.
17. **What is a circular dependency?** Two or more modules depend on each other, complicating initialization and reasoning.
18. **What is dynamic import?** `import()` returns a Promise and loads a module at runtime.
19. **Why separate storage and API modules?** They have different responsibilities and failure modes and can be tested independently.
20. **What belongs in `main.js`?** Startup and wiring modules/events, not every detail of UI, storage, and API logic.

## Output / syntax questions
21. Given `export const x = 1`, what is the import syntax? `import { x } from './file.js'`.
22. Given `export default function start(){}`, how do you import it? `import start from './file.js'`.
23. Can you write `import { default as start } from './file.js'`? Yes, though default-import syntax is clearer for most cases.
24. Is `import { x } from './file.js'` valid if the module only has a default export? No; the export names must match.
25. Does `import` work in a classic script? Static imports require a module context, such as `<script type="module">`.

## Practical questions
26. How would you split a single-file task app? Extract seed data, storage functions, DOM rendering, and app startup into separate modules.
27. How should localStorage JSON parse errors be handled? Catch them and provide a safe fallback.
28. How can you avoid globals? Use module scope and export only the values other modules need.
29. Why should UI rendering use `textContent` for user-entered strings? To avoid interpreting untrusted input as HTML.
30. How would you debug a failed import? Check `type="module"`, the exact relative path, extension, filename case, server MIME type, and whether the page is served over HTTP.

## Coding challenges
1. Create a module exporting `add`, `subtract`, and a default `multiply`.
2. Import and alias one named export.
3. Split a task app into `data`, `storage`, `ui`, and `main` modules.
4. Add a `utils/formatDate.js` helper and import it.
5. Refactor code that stores application state on `window` into module-scoped state.
6. Add a module for API requests that checks `response.ok`.
