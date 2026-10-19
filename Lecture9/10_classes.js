

class Student {
  constructor(name, branch, marks) {
    this.name = name;
    this.branch = branch;
    this.marks = marks;
  }

  getResult() {
    return this.marks >= 40 ? "PASS" : "FAIL";
  }

  getSummary() {
    return `${this.name} | ${this.branch} | ${this.marks} | ${this.getResult()}`;
  }
}

const student = new Student("Karan", "CSE", 78);

console.log(student.getSummary());
