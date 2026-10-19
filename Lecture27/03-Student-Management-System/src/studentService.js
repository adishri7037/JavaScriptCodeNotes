export function validateStudent(input, students, editingId = null) {
  const errors = {};
  const name = typeof input.name === "string" ? input.name.trim().replace(/\s+/g, " ") : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const course = typeof input.course === "string" ? input.course.trim() : "";

  if (name.length < 2 || name.length > 80) {
    errors.name = "Name must be between 2 and 80 characters.";
  }
  if (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!course) errors.course = "Choose a course.";

  const duplicate = students.some(student =>
    student.id !== editingId && student.email.toLowerCase() === email
  );
  if (email && duplicate) errors.email = "A student with this email already exists.";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    normalized: { name, email, course }
  };
}

export function createStudent(input, id = makeId()) {
  return { id, ...input, createdAt: new Date().toISOString() };
}

export function addStudent(students, student) {
  return [...students, student];
}

export function updateStudent(students, id, updates) {
  return students.map(student =>
    student.id === id ? { ...student, ...updates, id, createdAt: student.createdAt } : student
  );
}

export function deleteStudent(students, id) {
  return students.filter(student => student.id !== id);
}

export function filterStudents(students, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return students;

  return students.filter(student =>
    [student.name, student.email, student.course]
      .some(value => value.toLowerCase().includes(normalizedQuery))
  );
}

function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `student-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
