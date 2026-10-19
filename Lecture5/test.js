let a = 10;
  a = 20; // This will throw an error because 'a' has already been declared with 'let'

Console.log(a);

// let allows you to declare variables that are limited in scope to the block, statement, or expression in which they are used. In this case, trying to redeclare 'a' with 'let' will result in a syntax error.


// let ko redclare nhi kr skte 


var b = 10;
var b = 20; // This is allowed because 'var' allows redeclaration
 b= 40;
console.log(b);

const c = 30;
c = 40; // This will throw an error because 'c' is a constant and cannot be reassigned


const c = 50; 
console.log(c);