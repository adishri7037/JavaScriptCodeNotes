import { loadStudents, saveStudents } from "./storage.js";
import {
  validateStudent, createStudent, addStudent,
  updateStudent, deleteStudent, filterStudents
} from "./studentService.js";
import { renderStudents, setStatus, showErrors } from "./ui.js";

const form = document.querySelector("#student-form");
const idInput = document.querySelector("#student-id");
const nameInput = document.querySelector("#student-name");
const emailInput = document.querySelector("#student-email");
const courseInput = document.querySelector("#student-course");
const searchInput = document.querySelector("#student-search");
const list = document.querySelector("#student-list");
const count = document.querySelector("#student-count");
const status = document.querySelector("#status-message");
const formHeading = document.querySelector("#form-heading");
const submitButton = document.querySelector("#submit-button");
const cancelEditButton = document.querySelector("#cancel-edit");

const errorElements = {
  name: document.querySelector("#name-error"),
  email: document.querySelector("#email-error"),
  course: document.querySelector("#course-error")
};

let students = loadStudents();

function getFormData() {
  return {
    name: nameInput.value,
    email: emailInput.value,
    course: courseInput.value
  };
}

function persistAndCommit(nextStudents, successMessage) {
  if (!saveStudents(nextStudents)) {
    setStatus(status, "Could not save changes. Browser storage may be unavailable or full.");
    return false;
  }
  students = nextStudents;
  render();
  setStatus(status, successMessage);
  return true;
}

function render() {
  const visibleStudents = filterStudents(students, searchInput.value);
  renderStudents(list, visibleStudents, {
    onEdit: startEdit,
    onDelete: removeStudent
  });
  count.textContent = `${students.length} student${students.length === 1 ? "" : "s"}`;
}

function clearFormErrors() {
  showErrors(errorElements, {});
}

function resetForm() {
  form.reset();
  idInput.value = "";
  clearFormErrors();
  formHeading.textContent = "Add a student";
  submitButton.textContent = "Add student";
  cancelEditButton.hidden = true;
}

function startEdit(id) {
  const student = students.find(item => item.id === id);
  if (!student) {
    setStatus(status, "That student could not be found.");
    return;
  }

  idInput.value = student.id;
  nameInput.value = student.name;
  emailInput.value = student.email;
  courseInput.value = student.course;
  clearFormErrors();
  formHeading.textContent = "Edit student";
  submitButton.textContent = "Save changes";
  cancelEditButton.hidden = false;
  nameInput.focus();
  setStatus(status, `Editing ${student.name}.`);
}

function removeStudent(id) {
  const student = students.find(item => item.id === id);
  if (!student) return;
  if (!window.confirm(`Delete ${student.name}? This cannot be undone.`)) return;

  const nextStudents = deleteStudent(students, id);
  if (persistAndCommit(nextStudents, "Student deleted.")) {
    if (idInput.value === id) resetForm();
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  clearFormErrors();

  const editingId = idInput.value || null;
  const validation = validateStudent(getFormData(), students, editingId);
  showErrors(errorElements, validation.errors);

  if (!validation.valid) {
    setStatus(status, "Please correct the highlighted fields.");
    const firstInvalid = Object.keys(validation.errors)[0];
    ({ name: nameInput, email: emailInput, course: courseInput })[firstInvalid]?.focus();
    return;
  }

  const nextStudents = editingId
    ? updateStudent(students, editingId, validation.normalized)
    : addStudent(students, createStudent(validation.normalized));

  const successMessage = editingId ? "Student updated." : "Student added.";
  if (persistAndCommit(nextStudents, successMessage)) resetForm();
});

cancelEditButton.addEventListener("click", () => {
  resetForm();
  setStatus(status, "Edit cancelled.");
});

searchInput.addEventListener("input", render);

render();
