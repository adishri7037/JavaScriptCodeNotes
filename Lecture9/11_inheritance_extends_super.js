
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `I am ${this.name}, age ${this.age}.`;
  }
}

class Student extends Person {
  constructor(name, age, branch) {
    super(name, age); 
    this.branch = branch;
  }

  introduce() {
    return `${super.introduce()} I study ${this.branch}.`;
  }
}

const student = new Student("Aman", 21, "CSE");
console.log(student.introduce());
