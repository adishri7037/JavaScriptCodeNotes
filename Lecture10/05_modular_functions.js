// Modularize code into focused functions

function normalizeName(name) {
    return name.trim().replace(/\s+/g, " ");
}

function calculateTotal(marks) {
    return marks.reduce((sum, mark) => sum + mark, 0);
}

function calculateAverage(marks) {
    if (marks.length === 0) return 0;
    return calculateTotal(marks) / marks.length;
}

function getGrade(average) {
    if (average >= 90) return "A+";
    if (average >= 80) return "A";
    if (average >= 70) return "B";
    if (average >= 60) return "C";
    if (average >= 50) return "D";
    return "F";
}

function createReport(student) {
    const average = calculateAverage(student.marks);

    return {
        id: student.id,
        name: student.name,
        total: calculateTotal(student.marks),
        average: Number(average.toFixed(2)),
        grade: getGrade(average)
    };
}

const student = {
    id: 1,
    name: normalizeName("   Aman    Kumar "),
    marks: [82, 76, 91]
};

console.log(createReport(student));

// Good modular design:
// 1. One function should have one clear responsibility.
// 2. Validation functions should validate.
// 3. Calculation functions should calculate.
// 4. Reporting functions should format/return report data.
