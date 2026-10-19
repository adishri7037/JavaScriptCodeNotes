# Form Handling & Validation with JavaScript

## Topic
Form Handling & Validation with JavaScript

## Learning Objectives
- Read form input values safely.
- Understand `preventDefault()` and controlled submission.
- Build a vanilla JavaScript validation flow.
- Apply trimming, required checks, ranges, patterns, and cross-field rules.
- Display accessible inline validation errors.
- Control submit-button state.
- Implement reset and success states.
- Build a practical validated expense form.

## Folder Structure
- `01-concepts/01-form-handling-basics.html`
- `01-concepts/02-validation-rules.html`
- `01-concepts/03-accessible-errors.html`
- `01-concepts/04-submit-state.html`
- `02-practical-expense-form/index.html`
- `02-practical-expense-form/style.css`
- `02-practical-expense-form/script.js`
- `03-important-questions.md`

## How to Run
Open the HTML files directly in a browser, or use VS Code with Live Server.

## Practical
The expense form validates:
- Expense title: required and minimum length.
- Amount: required and must be between 1 and 1000000.
- Category: required.
- Date: required and not in the future.
- Description: optional, with a maximum length.
- Confirmation checkbox: required.
- Inline accessible error messages.
- Disabled submit button until the form is valid.
- Success message after valid submission.
- Reset behavior.

## Teaching Flow
1. Read values.
2. Stop native submission with `preventDefault()`.
3. Normalize input with `trim()`.
4. Validate individual fields.
5. Validate cross-field/business rules.
6. Render errors.
7. Update submit state.
8. Submit valid data.
9. Reset and restore initial state.
