# 1. Synchronous vs Asynchronous Code & Timers

## Learning objectives
After studying this topic, you should be able to:
- Explain synchronous and asynchronous execution.
- Explain why asynchronous programming matters.
- Use `setTimeout`, `clearTimeout`, `setInterval`, and `clearInterval`.
- Predict execution order using the call stack, task queues, and event loop.
- Build a digital clock, countdown timer, and traffic-light simulator.

## 2. Synchronous execution
Synchronous code runs one statement at a time, in order. A later statement waits until the current statement finishes.

```js
console.log("A");
console.log("B");
console.log("C");
// Output: A, B, C
```

A long synchronous operation blocks the main JavaScript thread. In a browser, this can delay clicks, animations, rendering, and other work.

```js
console.log("Start");
const start = Date.now();
while (Date.now() - start < 2000) {
  // Deliberately blocks for about 2 seconds. Do not use this in real apps.
}
console.log("End");
```

## 3. Asynchronous execution
Asynchronous APIs let work be scheduled or started without forcing the current call stack to wait for its completion. JavaScript can continue running other code while it waits for a timer, network response, or other event.

```js
console.log("Start");
setTimeout(() => console.log("Timer callback"), 0);
console.log("End");
// Output: Start, End, Timer callback
```

`setTimeout(..., 0)` does not mean “run right now.” It schedules the callback to run later, after the current synchronous work finishes and the event loop gets a chance to process it.

Common asynchronous operations:
- Timers: `setTimeout`, `setInterval`
- Network requests: `fetch`
- Promise reactions: `.then()`, `catch()`, `finally()`
- `async` / `await` (syntax built around Promises)
- Browser events such as clicks and keyboard input

## 4. Why asynchronous programming is needed
- **Responsiveness:** the UI can keep responding while waiting for network or timer events.
- **Concurrency of waiting:** many requests can be in flight without blocking the thread while each response is pending.
- **Better user experience:** show loading indicators, update progress, debounce search, and schedule retries.
- **Resource efficiency:** avoid busy-waiting while waiting for an event.
- **Periodic work:** refresh a display or poll for updates at intervals.

Asynchronous code does not automatically make CPU-heavy JavaScript faster. A long CPU-bound loop still blocks the main thread unless the work is broken into chunks or moved to a Worker.

## 5. The event loop in simple terms
A simplified browser model:
1. **Call stack:** executes the current JavaScript function.
2. **Host APIs:** the browser or runtime manages timers, networking, and events.
3. **Task (macrotask) queue:** callbacks such as timer callbacks are queued when eligible.
4. **Microtask queue:** Promise reactions and `queueMicrotask` callbacks are processed after the current stack empties, before the next task in the usual event-loop cycle.
5. **Event loop:** coordinates when queued work can run.

Example:
```js
console.log("1");
setTimeout(() => console.log("2: timer"), 0);
Promise.resolve().then(() => console.log("3: promise"));
console.log("4");
// Typical output: 1, 4, 3: promise, 2: timer
```
Why? The synchronous statements run first. Then the Promise reaction (microtask) runs before the timer task.

This is a useful model, not a complete description of every browser scheduling detail.

## 6. `setTimeout`
Runs a callback once after a minimum delay, subject to scheduling and runtime constraints.

```js
const timeoutId = setTimeout(() => {
  console.log("This runs once");
}, 1000);
```

- First argument: callback function.
- Second argument: delay in milliseconds.
- Return value: a timer identifier/handle.
- `1000` ms = 1 second.
- The delay is not an exact deadline.

### Passing arguments
```js
function greet(name) {
  console.log(`Hello, ${name}`);
}
setTimeout(greet, 500, "Asha");
```

### Common use cases
- Hide a toast after a delay.
- Debounce a search input.
- Schedule a retry.
- Delay a UI action.

## 7. `clearTimeout`
Cancels a timeout that has not yet fired.

```js
const timeoutId = setTimeout(() => {
  console.log("You should not see this if cancellation happens in time");
}, 3000);

clearTimeout(timeoutId);
```

Calling `clearTimeout` after the callback has already run does not undo it. Clearing an unknown or already-cleared identifier is generally harmless.

## 8. `setInterval`
Schedules a callback to repeat at a specified interval, in milliseconds.

```js
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Tick ${count}`);
  if (count === 5) {
    clearInterval(intervalId);
  }
}, 1000);
```

Use it for periodic updates, but remember:
- The interval is not a precision clock.
- Work in a callback can take longer than the interval.
- Browser tabs may throttle timers in the background.
- For a clock/countdown, calculate elapsed time from timestamps rather than assuming each tick is perfectly punctual.

## 9. `clearInterval`
Stops future executions of an interval callback.

```js
const intervalId = setInterval(() => {
  console.log("Repeating...");
}, 500);

setTimeout(() => {
  clearInterval(intervalId);
  console.log("Interval stopped");
}, 2500);
```

Keep the interval identifier if you need a Stop button or cleanup logic.

## 10. `setTimeout` vs `setInterval`
| Feature | `setTimeout` | `setInterval` |
|---|---|---|
| Runs | Once | Repeatedly |
| Typical use | One delayed action | Periodic action |
| Stop API | `clearTimeout(id)` | `clearInterval(id)` |
| Timing | Minimum delay, not exact | Approximate repeated schedule, not exact |
| Alternative | Schedule next timeout after work | Recursive timeout can avoid overlapping long work |

### Recursive `setTimeout`
For work that may take variable time, schedule the next run after the current one finishes:
```js
function poll() {
  doWork();
  setTimeout(poll, 1000);
}
function doWork() {
  console.log("Polling once");
}
// Start only when needed:
// poll();
```
This makes the delay occur after `doWork()` finishes, unlike an interval that keeps its repeating schedule.

## 11. Execution-order prediction method
When reading code, do this:
1. Write down every synchronous statement in source order.
2. Mark callbacks that are scheduled but do not execute immediately.
3. Mark Promise callbacks as microtasks.
4. Finish the current call stack.
5. Process queued microtasks.
6. Then process eligible tasks such as timer callbacks.
7. Remember that actual timer timing can be delayed.

Example:
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
Promise.resolve().then(() => console.log("D"));
console.log("E");
```
Output: `A, C, E, D, B`.

## 12. Common mistakes
- Assuming `setTimeout(fn, 0)` runs before the next line.
- Assuming a 1000 ms interval fires exactly every second.
- Forgetting to call `clearInterval` when stopping a timer or removing a component.
- Creating a new interval every time a button is clicked without clearing the old one.
- Using `setInterval` ticks as the source of truth for elapsed time.
- Blocking the main thread with long synchronous loops.
- Confusing “asynchronous” with “parallel.” Async waiting and parallel CPU execution are different concepts.

## 13. Best practices
- Store timer IDs when you may need to cancel them.
- Clean up timers when they are no longer needed.
- Use `Date.now()` or `performance.now()` to calculate elapsed time.
- Keep callbacks short.
- Use `try/catch` around operations that can fail; for Promises, handle rejections.
- Use `async`/`await` to make Promise-based flows easier to read.
- Avoid nested timer pyramids; prefer named functions or Promises where appropriate.
- In UI frameworks, create and clean up timers in the appropriate lifecycle/effect mechanism.

## 14. Quick revision
- Synchronous: current statement completes before the next statement runs.
- Asynchronous: work is scheduled or awaited without blocking the current stack.
- `setTimeout`: schedule once.
- `clearTimeout`: cancel a pending timeout.
- `setInterval`: schedule repeatedly.
- `clearInterval`: stop a repeating timer.
- Promise callbacks normally run as microtasks before timer tasks after the current stack empties.
- Timers specify a minimum delay, not an exact execution time.
