
class Student {
  constructor(id, name, branch, marks) {
    this.id = id;
    this.name = name;
    this.branch = branch;
    this.marks = marks;
  }

  getStatus() {
    return this.marks >= 40 ? "PASS" : "FAIL";
  }

  getGrade() {
    if (this.marks >= 90) return "A+";
    if (this.marks >= 80) return "A";
    if (this.marks >= 70) return "B";
    if (this.marks >= 60) return "C";
    if (this.marks >= 40) return "D";
    return "F";
  }

  getReport() {
    return `${this.id} | ${this.name} | ${this.branch} | ${this.marks} | ${this.getGrade()} | ${this.getStatus()}`;
  }
}

class GraduateStudent extends Student {
  constructor(id, name, branch, marks, projectTitle) {
    super(id, name, branch, marks);
    this.projectTitle = projectTitle;
  }

  getReport() {
    return `${super.getReport()} | Project: ${this.projectTitle}`;
  }
}

const students = [
  new Student(1, "Aman", "CSE", 86),
  new Student(2, "Riya", "ECE", 94),
  new GraduateStudent(3, "Karan", "CSE", 79, "Smart Campus")
];

console.log("STUDENT REPORTS");
for (const student of students) {
  console.log(student.getReport());
}

// Object.keys can be used for plain-object models.
const summary = {
  totalStudents: students.length,
  cseStudents: students.filter(s => s.branch === "CSE").length
};

console.log(Object.entries(summary));
