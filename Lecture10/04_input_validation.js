// Console input validation concepts
function isValidName(name) {
    const cleaned = name.trim();
    return cleaned.length >= 2 && /^[A-Za-z ]+$/.test(cleaned);
}

function isValidId(id) {
    return Number.isInteger(Number(id)) && Number(id) > 0;
}

function isValidMark(mark) {
    const value = Number(mark);
    return Number.isFinite(value) && value >= 0 && value <= 100;
}

console.log(isValidName("Aman Kumar"));  
console.log(isValidName("A"));          
console.log(isValidId("101"));        
console.log(isValidId("-5"));           
console.log(isValidMark("87"));         
console.log(isValidMark("120"));        
