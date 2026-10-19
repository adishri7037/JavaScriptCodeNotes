# Important Questions: Synchronous vs Asynchronous Code & Timers

## A. Core concepts

### 1. What is synchronous execution?
Code executes in sequence; each statement waits for the previous statement to finish.

### 2. What is asynchronous execution?
An operation can be scheduled or awaited while the current call stack continues. Its callback or continuation runs later when the runtime schedules it.

### 3. Why is asynchronous programming needed in JavaScript?
To keep applications responsive while waiting for timers, network operations, user events, and other external work. It avoids blocking while waiting, but does not automatically speed up CPU-heavy work.

### 4. Is JavaScript single-threaded?
JavaScript execution on a given main thread is generally single-threaded, but browsers and runtimes can perform work outside that thread and schedule results back. Workers can run JavaScript on separate threads.

### 5. Does asynchronous mean parallel?
No. Asynchronous means the caller need not block while waiting. Parallel means work literally runs at the same time, such as on separate worker threads or CPU cores.

### 6. What is the event loop?
The runtime mechanism that coordinates execution of the current call stack and queued callbacks/tasks, including microtasks.

### 7. What is the call stack?
A last-in, first-out structure tracking functions currently executing.

### 8. What is a callback?
A function passed to another function or API to be invoked later or under a particular condition.

## B. Timer APIs

### 9. What does `setTimeout()` do?
Schedules a callback to run once after at least the specified delay, when the runtime can process it.

### 10. What does `clearTimeout()` do?
Cancels a pending timeout using its identifier.

### 11. What does `setInterval()` do?
Schedules a callback to repeat at an approximate interval.

### 12. What does `clearInterval()` do?
Cancels future repetitions of an interval.

### 13. What is the unit of timer delay?
Milliseconds: 1000 milliseconds equals one second.

### 14. Does `setTimeout(fn, 0)` execute immediately?
No. It schedules the callback for a later task; current synchronous code finishes first.

### 15. Are timers exact?
No. The delay is a minimum threshold, and callbacks may be delayed by a busy call stack, other tasks, browser throttling, or runtime constraints.

### 16. Why should interval IDs be stored?
So the interval can be cancelled later and duplicate intervals can be prevented.

### 17. `setTimeout` vs `setInterval`?
Timeout schedules once; interval repeats until cleared. Recursive timeout is useful when the next run should be scheduled after the current work completes.

### 18. Why use `Date.now()` for a countdown?
To calculate remaining time from a deadline rather than assuming each timer tick happened exactly on schedule.

## C. Execution-order questions

### 19. Predict the output
```js
console.log("A");
console.log("B");
console.log("C");
```
**Answer:** A, B, C.

### 20. Predict the output
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
```
**Answer:** A, C, B.

### 21. Predict the output
```js
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("sync");
```
**Answer:** sync, promise, timeout (typical browser/Node event-loop behavior).

### 22. Predict the output
```js
console.log(1);
setTimeout(() => console.log(2), 10);
setTimeout(() => console.log(3), 0);
console.log(4);
```
**Answer:** 1, 4, then 3, then 2 under normal conditions. Timer callbacks can be delayed, so reason about eligibility rather than exact wall-clock timing.

### 23. Predict the output
```js
console.log("start");
Promise.resolve().then(() => {
  console.log("promise 1");
  Promise.resolve().then(() => console.log("promise 2"));
});
setTimeout(() => console.log("timer"), 0);
console.log("end");
```
**Answer:** start, end, promise 1, promise 2, timer.

### 24. What happens here?
```js
const id = setInterval(() => console.log("tick"), 1000);
clearInterval(id);
```
**Answer:** The interval is cancelled before its first callback can run, so normally no `tick` is logged.

### 25. What is the output?
```js
let n = 0;
const id = setInterval(() => {
  n++;
  console.log(n);
  if (n === 3) clearInterval(id);
}, 100);
```
**Answer:** 1, 2, 3, then it stops.

## D. Practical/design questions

### 26. How would you build a digital clock?
Read the current `Date`, render the time, and refresh periodically. Avoid incrementing a counter as the source of time.

### 27. How would you implement a countdown that does not drift badly?
Store `endAt = Date.now() + durationMs`, then calculate `Math.max(0, endAt - Date.now())` each update.

### 28. How do you prevent duplicate intervals when Start is clicked multiple times?
Check whether an interval ID already exists before starting, and clear/reset the ID when stopping.

### 29. What can cause a timer to run late?
Long synchronous work, queued tasks, background-tab throttling, runtime scheduling, or callback work taking a long time.

### 30. How should a timer be cleaned up in a component?
Clear the timeout or interval when the component is disposed/unmounted, using the framework's cleanup mechanism.

### 31. When might recursive `setTimeout` be better than `setInterval`?
When the next run should wait until the current operation completes, for example polling a slow API, to avoid overlapping work.

### 32. How would you test a timer-driven feature?
Test start/stop/reset, boundary values, zero duration, repeated button clicks, cancellation, phase transitions, and cleanup. In automated tests, fake timers can make time deterministic.

## E. Challenge exercises (try before reading answers)
1. Predict the output:
```js
console.log("one");
setTimeout(() => console.log("two"), 0);
Promise.resolve().then(() => console.log("three"));
console.log("four");
```
Answer: `one, four, three, two`.

2. Write a function `delay(ms)` that returns a Promise resolved after `ms`.
```js
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
```

3. Write `repeatUntil(count, callback, intervalMs)` that stops after `count` runs. Hint: retain the interval ID and clear it at the limit.

4. Extend the countdown project with a sound or notification when time reaches zero.

5. Extend the traffic light with a pedestrian crossing button and a safe transition sequence.

6. Explain why this is inaccurate:
```js
let seconds = 0;
setInterval(() => seconds++, 1000);
```
Answer: callbacks may be delayed; `seconds` counts callback executions, not exact elapsed time.
