# Synchronous vs Asynchronous Code & Timers
Complete JavaScript concept notes, runnable examples, practice projects, and interview questions.

## Contents
1. `01-Concept-Notes.md` — concepts, event loop, timers, execution order
2. `02-Examples/` — small runnable snippets
3. `03-Practice-Projects/` — digital clock, countdown timer, traffic-light simulator
4. `04-Important-Questions.md` — interview questions with answers
5. `index.html` — a single-page launcher for all three practice projects

## How to use
- Open `index.html` in a modern browser to try the three projects.
- Run standalone JavaScript examples with Node.js where noted. Browser timer examples can be pasted into DevTools Console.
- Read the notes before attempting the execution-order exercises.

## Key reminder
JavaScript timers schedule callbacks; they do **not** guarantee exact execution at the requested millisecond. A callback runs when its delay has elapsed and the event loop can process it.
