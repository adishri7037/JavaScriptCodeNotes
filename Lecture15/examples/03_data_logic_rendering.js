
const students = [
  { name: "Aman", marks: 82 },
  { name: "Riya", marks: 91 },
  { name: "Kabir", marks: 76 }
];

const list = document.querySelector("#studentList");

function getResult(student) {
  return student.marks >= 40 ? "Pass" : "Fail";
}

function renderStudents(data) {
  list.replaceChildren();

  const fragment = document.createDocumentFragment();

  data.forEach((student) => {
    const li = document.createElement("li");
    li.textContent = `${student.name}: ${student.marks} - ${getResult(student)}`;
    fragment.append(li);
  });

  list.append(fragment);
}

renderStudents(students);
