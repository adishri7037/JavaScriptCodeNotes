# Vanilla JavaScript Capstone — Important Questions and Answers

## Project and MVP

### 1. What is an MVP?
The smallest usable product that delivers the core value and lets you validate the workflow before investing in optional features.

### 2. How do you decide what belongs in the MVP?
Use the user problem, must-have user stories, acceptance criteria, time limits, and risk. Move optional features to a later phase.

### 3. Why write acceptance criteria?
They make “done” observable and testable, reducing ambiguity between developer, reviewer, and user.

## Architecture and modules

### 4. Why split a vanilla JS app into modules?
To separate responsibilities, limit scope, clarify dependencies, reduce global variables, and make code easier to test and maintain.

### 5. What should belong in a service module?
Reusable business rules and data operations, such as validation, duplicate checks, and student create/update/delete logic.

### 6. What belongs in a UI module?
DOM construction, rendering, and user-facing status messages. It should not own all business rules and persistence.

### 7. Why keep canonical state separate from filtered results?
Search results are derived data. Keeping the original collection intact prevents searching from accidentally discarding records.

## Data and storage

### 8. Why use stable IDs instead of array indexes?
Indexes change when records are sorted, filtered, inserted, or deleted. Stable IDs continue to identify the same record.

### 9. Why use JSON.stringify and JSON.parse?
Browser storage stores strings. Serialization converts structured data to a string; parsing restores the JavaScript value.

### 10. What can go wrong with localStorage?
It may be unavailable, full, stale, malformed, or changed by older app versions. Reads and writes should be guarded and data shape checked.

### 11. Is localStorage appropriate for real student records?
Not for sensitive or multi-user production records. It is suitable for a local learning demo with fictional data; real systems need proper access control, server-side validation, and an appropriate backend.

## Forms, security, and accessibility

### 12. Why validate on the client?
It gives immediate feedback and prevents common mistakes. The server must validate again if data is sent to a backend.

### 13. Why normalize email addresses?
Trimming whitespace and using a consistent casing policy helps avoid accidental duplicate records. The system should document its email comparison policy.

### 14. Why prefer textContent over innerHTML?
`textContent` inserts user-provided values as text instead of parsing them as markup, reducing injection risk.

### 15. What does accessible form design include?
Associated labels, clear error text, keyboard access, visible focus, correct input types, and programmatic links between fields and error messages.

### 16. What is an aria-live region used for?
It can announce dynamic status updates, such as “Student added,” to assistive technology without requiring the user to find the changed text manually.

## Quality and deployment

### 17. What should a README contain?
Purpose, features, technologies, setup, structure, screenshots, limitations, future work, and links to the live demo/repository.

### 18. What should be checked before deployment?
Import and asset paths, console errors, mobile behavior, keyboard navigation, storage behavior on the deployed origin, and absence of secrets.

### 19. What should peer review evaluate?
Correctness, clarity, separation of concerns, validation, error handling, accessibility, responsive behavior, and test coverage.

### 20. How would you explain your architecture in an interview?
Describe the path from user action to validation, state update, persistence, and rendering. Explain which module owns each step and why.

## Output / reasoning questions

### Q1: What does `getItem` return for a missing key?
`null`. Use a fallback deliberately, and guard JSON parsing.

### Q2: Why can filtering the canonical array be a bug?
If you overwrite the original collection with filtered results, records excluded by the search can be lost from the current application state.

### Q3: Why should the UI update only after a storage save succeeds?
Otherwise, the screen can claim data was saved even though persistence failed. For larger apps, state and persistence consistency need an explicit strategy.

### Q4: Why not use `innerHTML` for a student's name?
A name is user-controlled text. Use `textContent` so the browser does not interpret it as markup.

## Practical exercises
1. Add a course filter.
2. Add sorting by name.
3. Export student data as JSON.
4. Add an edit form with cancel behavior.
5. Implement duplicate-email validation.
6. Add loading/error states to the optional API import.
7. Write a README with screenshots and known limitations.
8. Prepare a 3–5 minute demo explaining architecture and tradeoffs.
