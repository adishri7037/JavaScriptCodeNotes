const STORAGE_KEY = "vanilla-capstone.students";

export function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Storage can contain old or manually edited data; only accept the expected shape.
    return parsed.filter(student =>
      student &&
      typeof student.id === "string" &&
      typeof student.name === "string" &&
      typeof student.email === "string" &&
      typeof student.course === "string" &&
      typeof student.createdAt === "string"
    );
  } catch {
    return [];
  }
}

export function saveStudents(students) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    return true;
  } catch {
    return false;
  }
}
