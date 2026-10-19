const step = label =>
  new Promise(resolve => setTimeout(() => {
    console.log(label);
    resolve(label);
  }, 250));

step("1. Create account")
  .then(() => step("2. Verify email"))
  .then(() => step("3. Create profile"))
  .then(() => step("4. Send welcome message"))
  .then(() => console.log("Registration complete"))
  .catch(error => console.error("Registration failed:", error));
