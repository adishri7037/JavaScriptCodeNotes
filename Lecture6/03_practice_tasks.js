// Practice Tasks
console.log("FUNCTION PRACTICE TASKS");

// Task 1
// Create a function calculateArea(length, width)
// Return the area of a rectangle.

// Task 2
// Create an arrow function isPositive(number)
// Return true if number is greater than 0.

// Task 3
// Create a function findLargest(...numbers)
// Return the largest number.

// Task 4
// Create a function calculateBill(amount, taxRate = 0.18)
// Return amount + tax.

// Task 5
// Create a function getGrade(marks)
// Return:
// 90-100 => A
// 80-89  => B
// 70-79  => C
// 60-69  => D
// below 60 => F
// Invalid values => "Invalid"

// Task 6
// Create a function reverseString(text)
// Return the reversed string.

// Task 7
// Create a function countVowels(text)
// Return the number of vowels.

// Task 8
// Create a function checkLogin(username, password)
// Use early returns for:
// missing username
// missing password
// wrong credentials
// successful login

// Task 9
// Create a function sumEvenNumbers(...numbers)
// Return the sum of only even numbers.

// Task 10
// Convert the following declaration into an arrow function:
// function cube(n) {
//     return n * n * n;
// }


// ---------------- SOLUTIONS ----------------

function calculateArea(length, width) {
    return length * width;
}

const isPositive = number => number > 0;

function findLargest(...numbers) {
    if (numbers.length === 0) {
        return undefined;
    }

    let largest = numbers[0];

    for (const number of numbers) {
        if (number > largest) {
            largest = number;
        }
    }

    return largest;
}

function calculateBill(amount, taxRate = 0.18) {
    return amount + amount * taxRate;
}

function getGrade(marks) {
    if (marks < 0 || marks > 100) {
        return "Invalid";
    }

    if (marks >= 90) return "A";
    if (marks >= 80) return "B";
    if (marks >= 70) return "C";
    if (marks >= 60) return "D";

    return "F";
}

function reverseString(text) {
    return text.split("").reverse().join("");
}

function countVowels(text) {
    let count = 0;
    const vowels = "aeiouAEIOU";

    for (const char of text) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    return count;
}

function checkLogin(username, password) {
    if (!username) {
        return "Username is required";
    }

    if (!password) {
        return "Password is required";
    }

    if (username !== "admin" || password !== "1234") {
        return "Invalid credentials";
    }

    return "Login successful";
}

function sumEvenNumbers(...numbers) {
    let total = 0;

    for (const number of numbers) {
        if (number % 2 === 0) {
            total += number;
        }
    }

    return total;
}

const cube = n => n * n * n;


// Test solutions
console.log("Area:", calculateArea(10, 5));
console.log("Positive:", isPositive(10));
console.log("Largest:", findLargest(12, 45, 7, 89, 23));
console.log("Bill:", calculateBill(1000));
console.log("Grade:", getGrade(86));
console.log("Reverse:", reverseString("JavaScript"));
console.log("Vowels:", countVowels("JavaScript"));
console.log("Login:", checkLogin("admin", "1234"));
console.log("Even sum:", sumEvenNumbers(1, 2, 3, 4, 5, 6));
console.log("Cube:", cube(4));
