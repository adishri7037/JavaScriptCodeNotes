
const original = {
  name: "Aman",
  marks: 85,
  branch: "CSE"
};

const copy = { ...original };
copy.marks = 95;

console.log("Original:", original);
console.log("Copy:", copy);

const academic = { branch: "CSE", semester: 7 };
const personal = { name: "Aman", city: "Delhi" };

const profile = { ...personal, ...academic };
console.log(profile);

const { name, ...details } = profile;
console.log(name);
console.log(details);


const a = {
  name: "A",
  address: { city: "Delhi" }
};

const b = { ...a };
b.address.city = "Noida";

console.log(a.address.city);
