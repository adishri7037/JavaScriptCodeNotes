const delay = (value, ms) =>
  new Promise(resolve => setTimeout(() => resolve(value), ms));

Promise.all([
  delay("profile", 300),
  delay("settings", 150),
  delay("notifications", 250)
]).then(results => {
  console.log(results); // order matches input order
}).catch(console.error);
