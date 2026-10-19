# Browser Storage, Clean Code & Defensive Programming

A practical JavaScript study package with detailed concept notes, runnable code, interview questions, and a tracker-app audit/refactoring practice.

## Package contents
- `01-Concept-Notes.md` — storage APIs, defaults, clean code, guard clauses, validation, and comments
- `02-Examples/storage-utils.js` — safe localStorage/sessionStorage helpers with JSON handling
- `02-Examples/clean-code.js` — defaults, naming, small functions, guard clauses, and sanitization
- `03-Tracker-Refactor/` — a sample tracker app, audit checklist, and refactored implementation
- `04-Important-Questions.md` — interview questions with answers and output scenarios

## Run with Node.js
Most browser storage APIs do not exist in Node.js. The storage example includes a small in-memory storage mock for demonstration.

```bash
node 02-Examples/storage-utils.js
node 02-Examples/clean-code.js
node 03-Tracker-Refactor/refactored-tracker.js
```

For browser testing, open `03-Tracker-Refactor/index.html` through a local development server (for example, VS Code Live Server). Avoid relying on `file://` behavior for browser storage.

## Suggested study order
1. Learn `localStorage` versus `sessionStorage`.
2. Understand missing values, defaults, JSON parsing, and storage failures.
3. Refactor a large function into small, single-purpose functions.
4. Add guard clauses and validate inputs at boundaries.
5. Complete the tracker audit checklist and compare your changes with the refactored version.
