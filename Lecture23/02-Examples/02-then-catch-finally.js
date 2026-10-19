Promise.resolve({ name: "Riya" })
  .then(user => {
    console.log("Hello", user.name);
    return user.name.toUpperCase();
  })
  .then(upperName => {
    console.log(upperName);
    throw new Error("A later step failed");
  })
  .catch(error => {
    console.log("Recovered from:", error.message);
    return "GUEST";
  })
  .then(value => console.log("Final value:", value))
  .finally(() => console.log("Cleanup always runs"));
