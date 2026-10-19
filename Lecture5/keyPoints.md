# Key Takeaways

## Core mental model
A loop repeats a block of code while a condition or iteration source allows it.

### for
Use when initialization, condition, and update naturally fit together.

### while
Use when the number of repetitions is not necessarily known in advance.

### do...while
Use when the body must execute at least once.

### break
Exit the nearest loop immediately.

### continue
Skip the rest of the current iteration.

### Nested loops
Use one loop inside another for grids, tables, matrices, and patterns.

### for...of
Read values from arrays, strings, and other iterables.

### for...in
Iterate over enumerable keys/property names.

## Pattern-solving strategy
1. Decide the number of rows.
2. Decide what changes from row to row.
3. Decide what the inner loop should print.
4. Build one row as a string.
5. Print the completed row.
6. Test with a small number of rows.
7. Check boundaries (`<` vs `<=`) carefully.

## Common mistakes
- Forgetting loop-variable updates.
- Using the wrong condition boundary.
- Accidentally creating an infinite loop.
- Confusing `=` with `===`.
- Using `for...in` when array values are needed.
- Forgetting that `break` exits only the nearest loop.
- Writing complicated nested-loop logic without tracing rows and columns.

## Suggested classroom activity
Give students a pattern and ask them to identify:
- number of rows,
- number of columns/symbols per row,
- spaces required,
- whether the count increases or decreases.
