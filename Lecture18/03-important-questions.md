# Important Questions — Form Handling & Validation with JavaScript

## Theory Questions

1. What is form handling in JavaScript?
2. Why is `event.preventDefault()` commonly used with the `submit` event?
3. What is the difference between reading a value using `input.value` and using `FormData`?
4. Why should user input often be normalized with `trim()` before validation?
5. What is the difference between a required-field rule and a pattern rule?
6. How can numeric range validation be implemented in vanilla JavaScript?
7. What is implicit type coercion, and why can it cause validation bugs?
8. How does a regular expression help validate a form field?
9. What is cross-field validation? Give two examples.
10. Why should validation logic be separated into small functions?
11. What is the difference between client-side validation and server-side validation?
12. Why should client-side validation never be treated as the only security boundary?
13. How can `aria-invalid` communicate an invalid field to assistive technology?
14. Why is `aria-describedby` useful for inline validation messages?
15. Why should error messages be associated with the specific field that caused the error?
16. When should a submit button be disabled?
17. What are the advantages and disadvantages of disabling a submit button until the form is valid?
18. How should a form's success state be communicated accessibly?
19. What should happen to validation errors when a form is reset?
20. Why is `novalidate` sometimes used when building custom JavaScript validation?

## Practical / Coding Questions

1. Build a registration form that validates name, email, password, and confirm-password.
2. Add a rule that password and confirm-password must match.
3. Build an expense form that rejects negative or zero amounts.
4. Add a date rule that prevents selecting a future date.
5. Show an inline error below each invalid field.
6. Disable the submit button until all required fields are valid.
7. On submission, use `preventDefault()` and log a validated object.
8. Add a reset button that clears all errors and success messages.
9. Use `FormData` to collect form values without manually reading every input.
10. Add accessible validation using `aria-invalid`, `aria-describedby`, and a live status message.

## Viva / Interview Focus

- `submit` event vs `click` event
- `preventDefault()`
- `FormData`
- `trim()`
- `Number()` and `Number.isFinite()`
- regular expressions
- required, range, and cross-field rules
- `aria-invalid`
- `aria-describedby`
- client-side vs server-side validation
