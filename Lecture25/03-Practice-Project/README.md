# Practice Project: Configurable Validators + Private Counter

## Requirements
1. Build `createValidator(options)` that returns a function.
2. Support `required`, `minLength`, `maxLength`, and `pattern` options.
3. The returned validator should return `{ valid, errors }`.
4. Build `createPrivateCounter(start)` with `increment`, `decrement`, `reset`, and `getValue`.
5. State must remain private: callers cannot directly set the internal count.
6. Add at least five tests or manual checks.

## Run
```bash
node app.js
```

Try adding `isEmail`, `isStrongPassword`, or a configurable numeric range validator after the base requirements work.
