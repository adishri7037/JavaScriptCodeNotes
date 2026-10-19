// Student Record Manager


const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const students = [
    { id: 101, name: "Aman Kumar", course: "B.Tech", marks: [78, 85, 91] },
    { id: 102, name: "Riya Sharma", course: "B.Tech", marks: [92, 88, 95] },
    { id: 103, name: "Kabir Singh", course: "B.Tech", marks: [55, 64, 60] }
];

// ---------- Utility / String Functions ----------

function normalizeText(value) {
    return String(value).trim().replace(/\s+/g, " ");
}

function normalizeName(name) {
    return normalizeText(name)
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

// ---------- Validation Functions ----------

function isValidName(name) {
    return /^[A-Za-z ]{2,}$/.test(normalizeText(name));
}

function isValidId(id) {
    const value = Number(id);
    return Number.isInteger(value) && value > 0;
}

function isValidCourse(course) {
    return normalizeText(course).length >= 2;
}

function isValidMark(mark) {
    const value = Number(mark);
    return Number.isFinite(value) && value >= 0 && value <= 100;
}

function hasDuplicateId(id) {
    return students.some(student => student.id === Number(id));
}

// ---------- Calculation Functions ----------

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

function getStudentReport(student) {
    const total = calculateTotal(student.marks);
    const average = calculateAverage(student.marks);

    return {
        ...student,
        total,
        average: Number(average.toFixed(2)),
        grade: getGrade(average)
    };
}

// ---------- Search Functions ----------

function searchByName(query) {
    const normalizedQuery = normalizeText(query).toLowerCase();

    return students.filter(student =>
        student.name.toLowerCase().includes(normalizedQuery)
    );
}

function searchById(id) {
    return students.find(student => student.id === Number(id));
}

// ---------- Display Functions ----------

function displayStudent(student) {
    const report = getStudentReport(student);

    console.log("\n--------------------------------");
    console.log(`ID      : ${report.id}`);
    console.log(`Name    : ${report.name}`);
    console.log(`Course  : ${report.course}`);
    console.log(`Marks   : ${report.marks.join(", ")}`);
    console.log(`Total   : ${report.total}`);
    console.log(`Average : ${report.average}`);
    console.log(`Grade   : ${report.grade}`);
    console.log("--------------------------------");
}

function displayAllStudents() {
    if (students.length === 0) {
        console.log("\nNo student records found.");
        return;
    }

    console.log("\n===== ALL STUDENTS =====");

    students.forEach((student, index) => {
        const report = getStudentReport(student);
        console.log(
            `${index + 1}. ${report.id} | ${report.name} | Avg: ${report.average} | Grade: ${report.grade}`
        );
    });
}

// ---------- Reports ----------

function showClassReport() {
    if (students.length === 0) {
        console.log("\nNo data available.");
        return;
    }

    const reports = students.map(getStudentReport);
    const classAverage =
        reports.reduce((sum, student) => sum + student.average, 0) / reports.length;

    const highest = reports.reduce((best, current) =>
        current.average > best.average ? current : best
    );

    const passed = reports.filter(student => student.average >= 40);
    const failed = reports.filter(student => student.average < 40);

    console.log("\n===== CLASS REPORT =====");
    console.log(`Students      : ${reports.length}`);
    console.log(`Class Average : ${classAverage.toFixed(2)}`);
    console.log(`Highest Avg   : ${highest.name} (${highest.average})`);
    console.log(`Passed        : ${passed.length}`);
    console.log(`Failed        : ${failed.length}`);
}

function showTopStudents() {
    const sorted = students
        .map(getStudentReport)
        .sort((a, b) => b.average - a.average);

    console.log("\n===== TOP STUDENTS =====");

    sorted.slice(0, 3).forEach((student, index) => {
        console.log(
            `${index + 1}. ${student.name} - Average: ${student.average}, Grade: ${student.grade}`
        );
    });
}

// ---------- Input Helpers ----------

function ask(question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer));
    });
}

async function askValidName() {
    while (true) {
        const name = await ask("Enter student name: ");

        if (isValidName(name)) {
            return normalizeName(name);
        }

        console.log("Invalid name. Use at least 2 alphabetic characters.");
    }
}

async function askValidId() {
    while (true) {
        const id = await ask("Enter student ID: ");

        if (isValidId(id) && !hasDuplicateId(id)) {
            return Number(id);
        }

        console.log("Invalid or duplicate ID.");
    }
}

async function askValidCourse() {
    while (true) {
        const course = await ask("Enter course: ");

        if (isValidCourse(course)) {
            return normalizeText(course);
        }

        console.log("Invalid course.");
    }
}

async function askMarks() {
    while (true) {
        const input = await ask("Enter marks separated by spaces: ");
        const parts = normalizeText(input).split(" ");

        if (parts.length === 0 || parts.some(mark => !isValidMark(mark))) {
            console.log("Enter marks from 0 to 100, separated by spaces.");
            continue;
        }

        return parts.map(Number);
    }
}

// ---------- CRUD Operations ----------

async function addStudent() {
    console.log("\n===== ADD STUDENT =====");

    const id = await askValidId();
    const name = await askValidName();
    const course = await askValidCourse();
    const marks = await askMarks();

    students.push({ id, name, course, marks });

    console.log("Student added successfully.");
}

async function searchStudent() {
    console.log("\n===== SEARCH =====");
    console.log("1. Search by ID");
    console.log("2. Search by name");

    const choice = await ask("Choose option: ");

    if (choice === "1") {
        const id = await ask("Enter ID: ");
        const student = searchById(id);

        if (student) {
            displayStudent(student);
        } else {
            console.log("Student not found.");
        }
    } else if (choice === "2") {
        const query = await ask("Enter name/search text: ");
        const results = searchByName(query);

        if (results.length === 0) {
            console.log("No matching students.");
        } else {
            results.forEach(displayStudent);
        }
    } else {
        console.log("Invalid option.");
    }
}

async function deleteStudent() {
    const id = await ask("Enter student ID to delete: ");
    const index = students.findIndex(student => student.id === Number(id));

    if (index === -1) {
        console.log("Student not found.");
        return;
    }

    const removed = students.splice(index, 1)[0];
    console.log(`${removed.name} deleted successfully.`);
}

// ---------- Menu ----------

async function showMenu() {
    while (true) {
        console.log(`
=============================
 STUDENT RECORD MANAGER
=============================
1. Add student
2. Display all students
3. Search student
4. Show class report
5. Show top students
6. Delete student
7. Exit
`);

        const choice = await ask("Choose an option: ");

        switch (choice) {
            case "1":
                await addStudent();
                break;
            case "2":
                displayAllStudents();
                break;
            case "3":
                await searchStudent();
                break;
            case "4":
                showClassReport();
                break;
            case "5":
                showTopStudents();
                break;
            case "6":
                await deleteStudent();
                break;
            case "7":
                console.log("Goodbye!");
                rl.close();
                return;
            default:
                console.log("Invalid option. Choose 1-7.");
        }
    }
}

showMenu();
