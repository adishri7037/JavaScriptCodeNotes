

const students = [
  { id: 1, name: "Aman", marks: 85 },
  { id: 2, name: "Riya", marks: 92 },
  { id: 3, name: "Karan", marks: 76 }
];  

for (const student of students) {
  console.log(`${student.id}: ${student.name} - ${student.marks}`);
}

const topper = students.find(student => student.marks === 92);
console.log("Topper:", topper);
