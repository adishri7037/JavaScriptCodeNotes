const editor = document.querySelector("#editor");
const preview = document.querySelector("#preview");
const editorStatus = document.querySelector("#editorStatus");

function updateEditor() {
  const text = editor.value;
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;

  // Safe: user text is inserted with textContent.
  preview.textContent = text;
  editorStatus.textContent = `${text.length} characters · ${words} words`;

  // data-* update
  preview.dataset.mode = text ? "editing" : "empty";
}

editor.addEventListener("input", updateEditor);

document.querySelector("#uppercaseBtn").addEventListener("click", () => {
  editor.value = editor.value.toUpperCase();
  updateEditor();
  editor.focus();
});

document.querySelector("#lowercaseBtn").addEventListener("click", () => {
  editor.value = editor.value.toLowerCase();
  updateEditor();
  editor.focus();
});

document.querySelector("#clearBtn").addEventListener("click", () => {
  editor.value = "";
  updateEditor();
  editor.focus();
});

// Quote data
const quotes = [
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: "Motivation"
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
    category: "Success"
  },
  {
    text: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
    category: "Learning"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    category: "Perseverance"
  }
];

const quoteText = document.querySelector("#quoteText");
const quoteAuthor = document.querySelector("#quoteAuthor");
const quoteCategory = document.querySelector("#quoteCategory");
const quoteStatus = document.querySelector("#quoteStatus");

let currentQuote = null;

function showRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[index];

  // Safe updates: all quote fields are plain text.
  quoteText.textContent = `“${currentQuote.text}”`;
  quoteAuthor.textContent = `- ${currentQuote.author}`;
  quoteCategory.textContent = `Category: ${currentQuote.category}`;

  // data-* attribute stores current category.
  quoteCategory.dataset.category = currentQuote.category.toLowerCase();

  // Accessibility state/message.
  quoteText.setAttribute("aria-label", `Quote by ${currentQuote.author}`);
  quoteStatus.textContent = "A new quote has been generated.";
}

document.querySelector("#newQuoteBtn").addEventListener("click", showRandomQuote);

document.querySelector("#copyQuoteBtn").addEventListener("click", async () => {
  if (!currentQuote) {
    quoteStatus.textContent = "Generate a quote first.";
    return;
  }

  const text = `“${currentQuote.text}” — ${currentQuote.author}`;

  try {
    await navigator.clipboard.writeText(text);
    quoteStatus.textContent = "Quote copied to clipboard.";
  } catch {
    quoteStatus.textContent =
      "Clipboard access is unavailable. Select and copy the quote manually.";
  }
});

// Initial state
updateEditor();
