# Tracker Application Audit & Refactor

This sample models a small task tracker. Audit the starter implementation first, then compare it with the refactored version.

## Audit task
Review `starter-tracker.js` and list at least six issues before opening `refactored-tracker.js`. Consider:
- unclear names and mixed responsibilities
- falsy-value defaults (`||`) that may replace valid values
- unguarded JSON parsing
- unvalidated/unnormalized titles
- unsafe `innerHTML` rendering
- mutations that make state harder to reason about
- storage failures that are ignored

## Run the refactored example
```bash
node refactored-tracker.js
```

## Browser demo
Serve `index.html` through a local HTTP server. It demonstrates safe text rendering and localStorage persistence. If storage is unavailable, the app displays an error rather than claiming the save succeeded.

## Your deliverables
1. Write an audit report with each issue, its risk, and a proposed fix.
2. Refactor one function at a time.
3. Verify add, complete, delete, reload, empty title, oversized title, and malformed saved data.
4. Explain why each comment exists. Remove comments that only narrate obvious syntax.
