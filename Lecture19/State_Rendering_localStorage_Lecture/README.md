# State, Rendering & localStorage — B.Tech 7th Semester

## Folder contents

- `01_Concept_Notes/concept_notes.md`
  - Complete lecture notes covering state, rendering, JSON, localStorage, initialization, empty states, schema defaults, limitations and errors.
- `02_Code_Examples/`
  - Small focused examples for state, JSON and localStorage.
- `03_Practical_Task_Manager/`
  - Complete practical project that persists tasks across browser refreshes.
- `04_Important_Questions/10_Important_Questions.md`
  - 10 important theory + practical questions and viva follow-ups.

## How to run the practical

1. Open the `03_Practical_Task_Manager` folder in VS Code.
2. Open `index.html` in a browser, preferably using the VS Code Live Server extension.
3. Add tasks, mark them complete, and delete tasks.
4. Refresh the browser. The tasks should remain because they are loaded from localStorage.
5. Open DevTools -> Application/Storage -> Local Storage to inspect the saved JSON.
6. To test recovery, you can manually replace the stored value with invalid JSON and refresh. The app should fall back to the default state.

## Teaching architecture

The practical demonstrates:

User action
    ↓
Update state
    ↓
Save state to localStorage
    ↓
Render DOM from state

This separates data from the visual representation and introduces a foundation for larger frontend applications.
