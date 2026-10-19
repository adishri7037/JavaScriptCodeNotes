function findUser(id, callback) {
  setTimeout(() => {
    if (!id) {
      callback(new Error("A user ID is required"));
      return;
    }
    callback(null, { id, name: "Mira" });
  }, 250);
}

findUser(12, (error, user) => {
  if (error) {
    console.error("Could not find user:", error.message);
    return;
  }
  console.log("Found user:", user);
});
