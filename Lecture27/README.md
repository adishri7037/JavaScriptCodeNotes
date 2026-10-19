# Vanilla JavaScript Capstone

A complete capstone study package for building a Student Management System using HTML, CSS, and vanilla JavaScript. It combines modules, DOM rendering, forms, browser storage, optional API integration, MVP planning, accessibility, responsive UI, documentation, deployment, and peer review.

## Package contents
- `01-Concept-Notes.md` — capstone planning, architecture, UI, testing, deployment, and review notes
- `02-Important-Questions.md` — interview/demo questions with answers
- `03-Student-Management-System/` — working multi-file project
- `04-Peer-Review-Checklist.md` — review rubric and demonstration plan

## Run the project
Because the app uses ES modules, serve the folder with a local HTTP server rather than opening `index.html` directly as a `file://` URL.

Examples:
- VS Code: install/use Live Server and open `03-Student-Management-System/index.html`
- Python: from the `03-Student-Management-System` directory run `python -m http.server 8000`, then open `http://localhost:8000`

No build step or framework is required. Student records are saved in localStorage. The API integration is optional and shown as an example service boundary; the core project works offline.

## Suggested workflow
1. Read `01-Concept-Notes.md`.
2. Run the Student Management System.
3. Inspect the modules and trace add/edit/delete/search flows.
4. Complete the extension tasks.
5. Use the peer-review checklist and prepare a 3–5 minute demo.
