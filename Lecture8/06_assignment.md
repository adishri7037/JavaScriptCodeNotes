Array Methods Assignment

Part A: Student Marks

Create this array:

const students = [
    { id: 1, name: "Aman", marks: 78 },
    { id: 2, name: "Riya", marks: 92 },
    { id: 3, name: "Kunal", marks: 45 },
    { id: 4, name: "Neha", marks: 85 },
    { id: 5, name: "Arjun", marks: 67 }
];

Complete these tasks:

1. Print every student using forEach()
2. Create an array of student names using map()
3. Create an array of students who passed using filter()
4. Calculate total marks using reduce()
5. Calculate average marks.
6. Find the first student scoring 90+ using find()
7. Find the index of student ID 4 using findIndex()
8. Check whether any student failed using some()
9. Check whether every student passed using every()
10. Use method chaining to obtain the names of students scoring 75+

Part B: Sales

Create sales records containing:
- product
- price     
- quantity

Then:

1. Print every sale.
2. Create product-name and revenue arrays.
3. Filter products with quantity >= 5.
4. Calculate total revenue.
5. Find the first product whose price is >= ₹20,000.
6. Find the index of a selected product.
7. Check whether any product has quantity >= 10.
8. Check whether all quantities are greater than zero.
9. Chain map() and filter() to find high-revenue products.
10. Explain why each selected array method is appropriate.

Challenge:-

Write one readable method chain that:
- calculates revenue per product,
- keeps products with revenue above ₹10,000,
- returns only their names.
