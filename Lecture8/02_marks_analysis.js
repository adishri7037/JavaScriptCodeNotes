// Practical: Student Marks Analysis
// Run with: node 02_marks_analysis.js

const students = [
    { id: 101, name: "Aman", marks: 78 },
    { id: 102, name: "Riya", marks: 92 },
    { id: 103, name: "Kunal", marks: 45 },
    { id: 104, name: "Neha", marks: 85 },
    { id: 105, name: "Arjun", marks: 67 }
];

console.log("=== ALL STUDENTS ===");
students.forEach(student => {
    console.log(`${student.id} - ${student.name}: ${student.marks}`);
});

console.log("\n=== STUDENT NAMES ===");
const names = students.map(student => student.name);
console.log(names);

console.log("\n=== PASSED STUDENTS ===");
const passedStudents = students.filter(student => student.marks >= 40);
console.log(passedStudents);

console.log("\n=== STUDENTS WITH 75+ ===");
const highScorers = students
    .filter(student => student.marks >= 75)
    .map(student => student.name);
console.log(highScorers);

console.log("\n=== FIRST STUDENT WITH 90+ ===");
const topper = students.find(student => student.marks >= 90);
console.log(topper);

console.log("\n=== INDEX OF STUDENT ID 104 ===");
const studentIndex = students.findIndex(student => student.id === 104);
console.log(studentIndex);

console.log("\n=== TOTAL MARKS ===");
const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);
console.log(totalMarks);

console.log("\n=== AVERAGE MARKS ===");
const averageMarks = totalMarks / students.length;
console.log(averageMarks.toFixed(2));

console.log("\n=== HIGHEST MARKS ===");
const highestMarks = students.reduce(
    (max, student) => Math.max(max, student.marks),
    students[0].marks
);
console.log(highestMarks);

console.log("\n=== ANY FAILED? ===");
const anyFailed = students.some(student => student.marks < 40);
console.log(anyFailed);

console.log("\n=== EVERYONE PASSED? ===");
const everyonePassed = students.every(student => student.marks >= 40);
console.log(everyonePassed);

console.log("\n=== METHOD-CHAINING EXAMPLE ===");
const improvedHighScorers = students
    .filter(student => student.marks >= 75)
    .map(student => ({
        name: student.name,
        improvedMarks: student.marks + 5
    }));

console.log(improvedHighScorers);
