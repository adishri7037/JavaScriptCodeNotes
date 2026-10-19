
function Student(name, branch, marks) {
  this.name = name;
  this.branch = branch;
  this.marks = marks;

  this.getResult = function () {
    return this.marks >= 40 ? "PASS" : "FAIL";
  };
}

const s1 = new Student("Aman", "CSE", 82);
const s2 = new Student("Riya", "ECE", 91);

console.log(s1.name, s1.getResult());
console.log(s2.name, s2.getResult());

