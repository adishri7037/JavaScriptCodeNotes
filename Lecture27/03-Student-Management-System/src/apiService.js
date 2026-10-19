// Optional extension: import demo users from a public placeholder API.
// This is deliberately not required by the offline-first MVP.
export async function fetchDemoStudents() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error(`Demo API request failed (${response.status})`);

  const users = await response.json();
  return users.map(user => ({
    id: `api-${user.id}`,
    name: user.name,
    email: user.email.toLowerCase(),
    course: "Imported",
    createdAt: new Date().toISOString()
  }));
}
