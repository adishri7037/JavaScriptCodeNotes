// Edge-case testing

function normalizeWords(text) {
    return text.trim().split(/\s+/).filter(Boolean);
}

function calculateAverage(marks) {
    if (!Array.isArray(marks) || marks.length === 0) return 0;
    return marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
}

const tests = [
    { input: "", expectedWords: 0 },
    { input: "   ", expectedWords: 0 },
    { input: "JavaScript", expectedWords: 1 },
    { input: "  JavaScript   is   fun ", expectedWords: 3 }
];

for (const test of tests) {
    const actual = normalizeWords(test.input).length;
    console.log(
        actual === test.expectedWords ? "PASS" : "FAIL",
        JSON.stringify(test.input),
        "=>",
        actual
    );
}

console.log("Empty marks:", calculateAverage([]));
console.log("Single mark:", calculateAverage([90]));
console.log("Multiple marks:", calculateAverage([80, 90, 100]));

// Important edge cases:
// Empty string
// Only spaces
// Multiple spaces between words
// Empty marks array
// Invalid marks
// Search with different letter case
// Search with leading/trailing spaces
// Duplicate student IDs
