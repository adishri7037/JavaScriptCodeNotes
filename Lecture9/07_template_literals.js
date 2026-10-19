
const student = {
  name: "Riya",
  marks: 91,
  branch: "CSE"
};

const result = `
Student Report
--------------
Name   : ${student.name}
Branch : ${student.branch}
Marks  : ${student.marks}
Status : ${student.marks >= 40 ? "PASS" : "FAIL"}
`;

console.log(result);
