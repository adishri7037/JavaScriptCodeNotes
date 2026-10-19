 

const college = {
  name: "ABC Institute",
  location: {
    city: "Ghaziabad",
    state: "Uttar Pradesh"
  },
  departments: ["CSE", "ECE", "ME"]
};

console.log(college.name);
console.log(college.location.city);
console.log(college["location"]["state"]);


const key = "name";
console.log(college[key]);

const subject = {
  "subject-name": "JavaScript",
  credits: 4
};

console.log(subject["subject-name"]);
