// Open a browser console to run this example.
const timeoutId = setTimeout(() => {
  console.log("This message should be cancelled");
}, 2000);
clearTimeout(timeoutId);

let ticks = 0;
const intervalId = setInterval(() => {
  ticks += 1;
  console.log(`Tick ${ticks}`);
  if (ticks >= 3) clearInterval(intervalId);
}, 1000);
