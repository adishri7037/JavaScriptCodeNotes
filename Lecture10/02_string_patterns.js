// Character frequency and word-processing patterns

// Count characters in a string.
function characterFrequency(text) {
    const frequency = {};

    for (const char of text.toLowerCase()) {
        if (char === " ") continue; //edge case

        frequency[char] = (frequency[char] || 0) + 1;
    }

    return frequency;
}

console.log(characterFrequency("banana"));

// Count words.
function wordFrequency(sentence) {
    const words = sentence
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    const frequency = {};

    for (const word of words) {
        frequency[word] = (frequency[word] || 0) + 1;
    }

    return frequency;
}

console.log(wordFrequency("JavaScript is fun and JavaScript is powerful"));



// Find the longest word.
function longestWord(sentence) {
    const words = sentence.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) return "";

    let longest = words[0];

    for (const word of words) {
        if (word.length > longest.length) {
            longest = word;
        }
    }

    return longest;
}

console.log(longestWord("Learning JavaScript problem solving"));




// This pattern is extremely useful for:
// character frequency
// word frequency
// counting numbers
// finding duplicates
// counting votes
// counting occurrences
