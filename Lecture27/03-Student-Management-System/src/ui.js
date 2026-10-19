export function renderStudents(container, students, handlers) {
  container.replaceChildren();

  if (students.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No students found. Add a student or try a different search.";
    container.append(empty);
    return;
  }

  for (const student of students) {
    const card = document.createElement("article");
    card.className = "student-card";

    const info = document.createElement("div");
    info.className = "student-info";

    const name = document.createElement("h3");
    name.textContent = student.name;

    const email = document.createElement("p");
    email.textContent = student.email;

    const course = document.createElement("span");
    course.className = "course-pill";
    course.textContent = student.course;

    info.append(name, email, course);

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => handlers.onEdit(student.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => handlers.onDelete(student.id));

    actions.append(editButton, deleteButton);
    card.append(info, actions);
    container.append(card);
  }
}

export function setStatus(element, message) {
  element.textContent = message;
}

export function showErrors(elements, errors) {
  for (const [field, element] of Object.entries(elements)) {
    element.textContent = errors[field] ?? "";
  }
}
