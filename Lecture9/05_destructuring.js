
const student = {
  name: "Neha",
  branch: "CSE",
  marks: 88
};

const { name, marks } = student;
console.log(name, marks);

// Rename while destructuring
const { branch: department } = student;
console.log(department);

// Default value
const { semester = 7 } = student;
console.log(semester);

// Array destructuring
const subjects = ["HTML", "CSS", "JavaScript"];
const [first, second, third] = subjects;
console.log(first, second, third);

// Rest in destructuring
const [mainSubject, ...otherSubjects] = subjects;
console.log(mainSubject, otherSubjects);
