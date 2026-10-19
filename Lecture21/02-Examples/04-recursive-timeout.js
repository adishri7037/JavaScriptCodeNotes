// Browser console or Node.js
let run = 0;

function task() {
  run += 1;
  console.log(`Task ${run}`);
  if (run < 4) {
    setTimeout(task, 1000);
  }
}

task(); // runs now, then schedules the next run after each task completes
