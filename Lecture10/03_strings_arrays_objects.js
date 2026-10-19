// Combining strings, arrays and objects

const students = [
    { id: 101, name: "Aman", marks: [78, 85, 91] },
    { id: 102, name: "Riya", marks: [92, 88, 95] },
    { id: 103, name: "Kabir", marks: [55, 64, 60] }
];

function calculateTotal(marks) {
    return marks.reduce((total, mark) => total + mark, 0);
}

function calculateAverage(marks) {
    return calculateTotal(marks) / marks.length;
}

function createStudentReport(student) {
    const total = calculateTotal(student.marks);
    const average = calculateAverage(student.marks);

    return `${student.name} (ID: ${student.id}) - Total: ${total}, Average: ${average.toFixed(2)}`;
}

for (const student of students) {
    console.log(createStudentReport(student));
}

// Search by name using normalized strings.
function findStudentByName(students, searchText) {
    const query = searchText.trim().toLowerCase();

    return students.find(student =>
        student.name.toLowerCase().includes(query)
    );
}

console.log(findStudentByName(students, "ri"));
