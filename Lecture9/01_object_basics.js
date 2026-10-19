const student = {
  id: 101,
  name: "Aman",
  branch: "CSE",
  marks: 87,

  displayInfo() {
    return `${this.name} (${this.branch}) - ${this.marks} marks`;
  }
};

console.log(student);
console.log(student.name);       
console.log(student["branch"]);  
console.log(student.displayInfo());

student.semester = 7;
student.marks = 90;
delete student.semester;

console.log(student);
