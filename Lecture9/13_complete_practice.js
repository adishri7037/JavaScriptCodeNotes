
class Employee {
  constructor(id, name, department, salary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary;
  }

  getAnnualSalary() {
    return this.salary * 12;
  }

  getSummary() {
    return `${this.id} - ${this.name} - ${this.department} - Annual: ₹${this.getAnnualSalary()}`;
  }
}

const employees = [
  new Employee(101, "Aman", "IT", 50000),
  new Employee(102, "Riya", "HR", 45000),
  new Employee(103, "Karan", "IT", 60000)
];

for (const employee of employees) {
  console.log(employee.getSummary());
}

const itEmployees = employees.filter(e => e.department === "IT");
console.log("IT employees:", itEmployees.length);
