/*
PRACTICE TASKS — Solve these yourself first.

1. Print numbers from 1 to 100.
2. Print numbers from 100 down to 1.
3. Print all even numbers from 1 to 50.
4. Print all odd numbers from 1 to 50.
5. Find the sum of numbers from 1 to n.
6. Find the factorial of n.
7. Print the multiplication table of a number.
8. Count how many digits are in a positive integer.
9. Reverse a positive integer using a loop.
10. Find the largest digit in a number.
11. Check whether a number is prime.
12. Print all prime numbers between 1 and 100.
13. Print the first n Fibonacci numbers.
14. Count vowels in a string using for...of.
15. Find the first number in an array greater than 50 and stop using break.
16. Print only positive values from an array using continue.
17. Generate a 5x5 star square.
18. Generate a right-aligned star triangle.
19. Generate an inverted number triangle.
20. Generate a pyramid pattern.

CHALLENGE:
Create a menu-like loop that repeatedly processes values until
a special value is entered. Use a do...while loop.
*/


// Sample solution: Fibonacci
const terms = 8;
let a = 0;
let b = 1;

for (let i = 1; i <= terms; i++) {
  console.log(a);
  const next = a + b;
  a = b;
  b = next;
}
