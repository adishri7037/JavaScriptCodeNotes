
function Student(name, marks) {
  this.name = name;
  this.marks = marks;
}


Student.prototype.getResult = function () {
  return this.marks >= 40 ? "PASS" : "FAIL";
};

const s1 = new Student("Aman", 82);
const s2 = new Student("Riya", 91);

console.log(s1.getResult());
console.log(s2.getResult());

console.log(Object.getPrototypeOf(s1) === Student.prototype); // true
