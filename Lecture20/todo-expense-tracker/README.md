# Daymark — To-do & Expense Tracker

A responsive, single-page personal dashboard for organizing tasks and keeping an eye on everyday spending. It runs in a modern browser and saves its data locally on the device.

## Run it

Open `index.html` in a modern browser. There is no build step, package installation, or server requirement. The Google Fonts link is optional: if the browser is offline, the page uses system sans-serif fonts.

## Features

### Tasks

- Create, read, edit, complete, and delete tasks.
- Add optional notes and choose a low, normal, or high priority.
- Search titles and notes; filter the list by all, to-do, or completed.
- Clear completed tasks in one action.
- See open and completed counts, a completion percentage, and helpful empty states.

### Expenses

- Create, read, edit, and delete expense records.
- Store a description, amount in Indian rupees, date, and category.
- See recent expenses and the total and number of entries for the current month.
- Amounts are checked to be positive and within the supported limit.

### Data and accessibility

- Both collections are saved automatically in `localStorage` under `daymark-data-v1` and stay in the current browser profile.
- The interface uses delegated click handling for dynamically rendered rows, native dialog forms, inline validation, keyboard-operable controls, and live status announcements.
- Task titles and notes are escaped before rendering. Corrupt or missing saved data safely loads as an empty collection.
- Layout adapts to desktop, tablet, and mobile screens.

## Project structure

```text
todo-expense-tracker/
├── index.html   # Dashboard markup and task/expense dialogs
├── styles.css   # Responsive layout, components, and visual styling
├── app.js       # State, storage, validation, rendering, and interactions
└── README.md    # Project guide
```

## Data notes

Data is stored only in this browser's local storage. It is not synced between devices or browser profiles. Clearing browser site data removes the saved tasks and expenses. There is no account or remote service.

## Customization

- Change the default currency formatter in `app.js` (`Intl.NumberFormat`) to use another currency.
- Add or rename expense categories in the expense form in `index.html`; matching category icons and styling are defined in `app.js` and `styles.css`.
- Adjust colors through the CSS custom properties at the top of `styles.css`.
