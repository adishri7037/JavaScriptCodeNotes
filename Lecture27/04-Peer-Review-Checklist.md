# Peer Review and Demonstration Checklist

## A. Functionality
- [ ] Add a valid student.
- [ ] Reject invalid name and email.
- [ ] Prevent duplicate emails (case-insensitive).
- [ ] Search by name, email, and course.
- [ ] Edit a student while preserving the ID.
- [ ] Delete a student.
- [ ] Refresh and confirm persistence.
- [ ] Show helpful empty and no-results states.
- [ ] Handle malformed stored data.

## B. Code quality
- [ ] Function and variable names reveal intent.
- [ ] UI, validation, storage, and state operations are separated.
- [ ] No unnecessary global variables.
- [ ] Guard clauses handle invalid input.
- [ ] State updates are predictable.
- [ ] No user-controlled values are inserted through `innerHTML`.
- [ ] Errors are handled instead of silently ignored.

## C. Accessibility and responsiveness
- [ ] All form controls have labels.
- [ ] Keyboard focus is visible.
- [ ] Main workflows work without a mouse.
- [ ] Status changes are announced.
- [ ] Layout works on mobile and desktop.
- [ ] Long text does not break the layout.
- [ ] Contrast is readable.

## D. Documentation and delivery
- [ ] README explains purpose and setup.
- [ ] Screenshots show meaningful states.
- [ ] Limitations and future improvements are documented.
- [ ] Live deployment works.
- [ ] No secrets or real student data are committed.

## E. Peer-review notes
**Strengths:**
- 

**Potential bugs or edge cases:**
- 

**Suggested improvements:**
- 

**One question for the author:**
- 

## 3–5 minute demo script
1. Explain the user problem and MVP (30 seconds).
2. Add a student and show validation (45 seconds).
3. Search, edit, and delete (60 seconds).
4. Refresh and show saved state (20 seconds).
5. Explain module structure and data flow (60 seconds).
6. Show responsive/keyboard behavior (30 seconds).
7. Explain one limitation and next step (30 seconds).
