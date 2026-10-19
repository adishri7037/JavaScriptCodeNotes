const pending = new Promise(resolve => {
  setTimeout(() => resolve("fulfilled after 500ms"), 500);
});
const fulfilled = Promise.resolve("already fulfilled");
const rejected = Promise.reject(new Error("example rejection"));

pending.then(console.log);
fulfilled.then(console.log);
rejected.catch(error => console.log(error.message));
