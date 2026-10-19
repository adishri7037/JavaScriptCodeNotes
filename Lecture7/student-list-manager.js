// student-list-manager.js
// Hands-on Activity: Console-based Student List Manager
// Run with: node student-list-manager.js

const students = [
    { id: 101, name: "Aarav", marks: 86 },
    { id: 102, name: "Diya", marks: 94 },
    { id: 103, name: "Kabir", marks: 72 }
];

function displayStudents() {
    console.log("\n--- STUDENT LIST ---");

    if (students.length === 0) {
        console.log("No students found.");
        return;
    }

    students.forEach((student, index) => {
        console.log(
            `${index + 1}. ID: ${student.id} | Name: ${student.name} | Marks: ${student.marks}`
        );
    });
}

function addStudent(id, name, marks) {
    students.push({ id, name, marks });
    console.log(`Student "${name}" added.`);
}

function removeStudentById(id) {
    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        console.log("Student not found.");
        return;
    }

    const removed = students.splice(index, 1);
    console.log(`Removed: ${removed[0].name}`);
}

function searchStudent(name) {
    const student = students.find(
        student => student.name.toLowerCase() === name.toLowerCase()
    );

    if (student) {
        console.log("Found:", student);
    } else {
        console.log("Student not found.");
    }
}

function showTopper() {
    if (students.length === 0) {
        console.log("No students available.");
        return;
    }

    let topper = students[0];

    for (const student of students) {
        if (student.marks > topper.marks) {
            topper = student;
        }
    }

    console.log("Topper:", topper);
}

function showFirstTwoStudents() {
    console.log("First two students:", students.slice(0, 2));
}

// Demonstration
console.log("=== STUDENT LIST MANAGER ===");

displayStudents();

addStudent(104, "Meera", 88);
displayStudents();

searchStudent("Diya");

showTopper();

showFirstTwoStudents();

removeStudentById(102);
displayStudents();

// Extra practice:
// 1. Add updateStudentMarks(id, newMarks)
// 2. Add countPassedStudents() where marks >= 40
// 3. Add hasStudent(id) using includes/find
// 4. Add removeFirstStudent() using shift()
// 5. Add addStudentAtBeginning() using unshift()
