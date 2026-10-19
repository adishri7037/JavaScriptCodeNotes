// Intentionally nested to illustrate callback hell.
const wait = (label, callback) => {
  setTimeout(() => {
    console.log(label);
    callback(null, label);
  }, 250);
};

wait("1. Create account", (err) => {
  if (err) return console.error(err);
  wait("2. Verify email", (err) => {
    if (err) return console.error(err);
    wait("3. Create profile", (err) => {
      if (err) return console.error(err);
      wait("4. Send welcome message", (err) => {
        if (err) return console.error(err);
        console.log("Registration complete");
      });
    });
  });
});
