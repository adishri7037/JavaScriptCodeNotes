# Vanilla JavaScript Capstone — Complete Concept Notes

## 1. What is a capstone project?

A capstone is a complete project that demonstrates you can combine individual skills into a maintainable application. The goal is not to add as many features as possible; it is to deliver a small, coherent product that works reliably and can be explained.

For a vanilla JavaScript capstone, demonstrate:
- semantic HTML and responsive CSS
- DOM events and rendering
- form handling and validation
- JavaScript modules and separation of concerns
- a clear data model
- persistence with browser storage
- accessibility and error/empty states
- testing, README documentation, screenshots, and deployment

## 2. Scope and MVP planning

**MVP (minimum viable product)** means the smallest version that solves the core user problem end-to-end.

### Example problem statement
A teacher or administrator needs a simple way to register students, view records, find a student quickly, and update or remove a record.

### User stories
- As an administrator, I can add a student with a name, email, and course.
- I can see all saved students after refreshing the page.
- I can search students by name, email, or course.
- I can edit a student's information.
- I can delete a student after confirming the action.
- I can understand validation errors using keyboard and assistive technology.

### Prioritize features
**Must have:** add, list, search, edit, delete, validation, localStorage persistence, responsive layout, accessible labels and status messages.

**Should have:** filter by course, student count, export/import JSON, sorting.

**Could have:** API integration, pagination, authentication, charts, backend database.

**Not in the first MVP:** complex role management, payment systems, or features that require a backend unless the project brief requires them. localStorage is suitable for a learning demo, not a secure or multi-user production database.

### Acceptance criteria
Turn vague requirements into observable checks. For example:
- Submitting a valid form adds exactly one record.
- A blank name shows a helpful error and does not save.
- Editing a record preserves its ID.
- Deleting a record removes it from both the visible list and storage.
- Search updates results without altering the original data.
- Reloading restores saved records.
- The application works at narrow mobile widths and with keyboard-only navigation.

## 3. Data model

Use one consistent shape for each student.

```js
{
  id: "student-unique-id",
  name: "Asha Sharma",
  email: "asha@example.com",
  course: "JavaScript",
  createdAt: "2026-01-15T10:30:00.000Z"
}
```

Guidelines:
- Give each record a stable unique ID. Do not use the array index as an ID because ordering can change.
- Keep values in a predictable type and shape.
- Validate records loaded from storage because old or malformed data may exist.
- Keep derived UI values, such as filtered students, separate from the canonical array.
- Treat email uniqueness as a product rule; this sample enforces case-insensitive uniqueness.

## 4. Rendering architecture

A maintainable small application can be split into modules:

- `studentService.js`: data operations and validation rules
- `storage.js`: reading and writing persisted data
- `ui.js`: DOM rendering and status messages
- `main.js`: event wiring and application flow

The flow is:

1. Read persisted data.
2. Validate and normalize it.
3. Keep the canonical student list in application state.
4. Apply search/filter operations to derive the visible list.
5. Render DOM nodes from data.
6. On a user action, compute the next state.
7. Save it successfully before committing the visible state.
8. Render the updated state and announce the result.

Avoid mixing HTML construction, storage access, validation, and business logic into one large event handler. Prefer functions with one clear responsibility.

## 5. Modules

Use `<script type="module" src="./src/main.js"></script>` in HTML. Modules support `import` and `export`, have their own scope, and run in strict mode.

```js
// studentService.js
export function normalizeName(value) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

// main.js
import { normalizeName } from "./studentService.js";
```

Important:
- Serve modules over HTTP(S) during development; `file://` can cause module/CORS restrictions.
- Use correct relative paths and include `.js` extensions in browser imports.
- Avoid unnecessary globals; export only what another module needs.
- Keep dependency direction understandable.

## 6. Forms and validation

A form should have:
- an associated visible label for each field
- appropriate input types, such as `type="email"`
- client-side validation for usability
- an accessible error or status message
- clear submit and cancel actions for editing

Client-side validation improves UX but is not a security boundary. A real backend must validate input again.

Example:
```js
function validateStudent(input) {
  const errors = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";

  if (name.length < 2 || name.length > 80) {
    errors.name = "Name must be 2–80 characters.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  return { valid: Object.keys(errors).length === 0, errors, normalized: { ...input, name, email } };
}
```

Keep errors near the relevant fields when possible. Do not rely only on color to communicate an error.

## 7. Browser storage

localStorage stores strings, so arrays and objects need JSON serialization.

```js
localStorage.setItem("students", JSON.stringify(students));
const students = JSON.parse(localStorage.getItem("students") ?? "[]");
```

Production-quality code should handle `JSON.parse()` and storage failures with `try/catch`. Storage can be blocked, full, stale, or malformed. Never store passwords or sensitive student information in localStorage. For this learning project, use fictional sample data only.

## 8. Optional API integration

An API can provide data from a remote service, but the MVP should not depend on it if the project is meant to work offline.

```js
export async function fetchExampleStudents() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  const users = await response.json();

  return users.map(user => ({
    id: `api-${user.id}`,
    name: user.name,
    email: user.email.toLowerCase(),
    course: "Imported"
  }));
}
```

Handle loading, empty, and error states. Never assume a network request succeeds. Avoid sending real student data to a third-party API without authorization and an appropriate privacy review.

## 9. DOM safety

For user-controlled strings, prefer `textContent` instead of injecting strings into `innerHTML`. Build elements with `document.createElement()` and set their properties. This avoids interpreting user input as HTML.

```js
const name = document.createElement("span");
name.textContent = student.name;
```

Also:
- use event listeners rather than inline event-handler attributes
- use stable IDs or data attributes to identify records
- confirm destructive actions
- do not use array indexes as permanent identifiers

## 10. Responsive design

A responsive interface should work at mobile, tablet, and desktop widths.

Practical checklist:
- use flexible widths and CSS Grid/Flexbox
- avoid fixed page widths
- use `minmax()` and wrapping layouts
- allow tables to scroll or switch to cards on small screens
- ensure touch targets are comfortably sized
- verify zoom and long text wrapping
- test with browser dev tools at several viewport widths

## 11. Accessibility essentials

- Use semantic landmarks and headings in a logical order.
- Every input needs a programmatically associated label.
- Buttons need meaningful accessible names.
- Ensure visible keyboard focus.
- Make all actions usable without a mouse.
- Announce dynamic status changes with `aria-live` or `role="status"`.
- Associate field errors using `aria-describedby`.
- Do not use color alone to communicate state.
- Ensure text and controls have sufficient contrast.

Accessibility is not a final polish step; it is part of the MVP definition.

## 12. Testing and quality assurance

At minimum test:
- adding valid and invalid students
- duplicate email handling
- searching with different capitalization
- editing without changing the ID
- deleting a student
- empty state and no search results
- reload persistence
- malformed saved data
- storage write failure (where practical)
- keyboard-only navigation and responsive layout

Separate pure functions such as validation from DOM/storage code so they are easier to test.

## 13. README and screenshots

A useful README should include:
1. Project title and purpose
2. Features
3. Technologies
4. Setup and run instructions
5. Project structure
6. Screenshots
7. Known limitations
8. Future improvements
9. Live demo URL and repository URL, if available

Screenshots should show the main screen, add/edit form, and search or empty state. Use fictional data only. Keep images optimized and give them descriptive alt text in the README.

## 14. Deployment

For a static vanilla JS project, common hosting options include GitHub Pages, Netlify, or Vercel static hosting.

Before deployment:
- verify every asset/import path
- test the deployed URL (not only localhost)
- ensure no secrets are committed
- test localStorage behavior on the final origin
- check mobile layout and console errors
- include setup instructions and a known-limitations section

Do not commit API keys. A browser-only app cannot keep secrets hidden from users.

## 15. Peer code review and demonstration

Ask reviewers to focus on correctness, readability, accessibility, and maintainability—not personal style preferences.

A concise demo plan:
1. State the user problem and MVP scope.
2. Add a student and demonstrate validation.
3. Search, edit, and delete a record.
4. Refresh to demonstrate persistence.
5. Show module boundaries and explain the data flow.
6. Demonstrate responsive layout and keyboard access.
7. Explain one tradeoff, one limitation, and one next improvement.

## 16. Final capstone checklist

- [ ] MVP is clearly scoped.
- [ ] Student data shape is consistent.
- [ ] Modules have focused responsibilities.
- [ ] Forms validate and normalize input.
- [ ] DOM rendering is safe.
- [ ] Storage loading and saving handle errors.
- [ ] Search does not mutate canonical state.
- [ ] Empty, success, and error states are clear.
- [ ] UI is responsive and keyboard accessible.
- [ ] README and screenshots are included.
- [ ] Deployment is tested.
- [ ] Peer review and demo are completed.
