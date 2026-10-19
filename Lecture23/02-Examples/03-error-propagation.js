Promise.resolve("start")
  .then(value => {
    console.log(value);
    throw new Error("step 2 failed");
  })
  .then(() => console.log("This is skipped"))
  .catch(error => {
    console.log("Caught:", error.message);
    return "fallback";
  })
  .then(value => console.log("Continued with:", value));
