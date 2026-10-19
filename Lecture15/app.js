// ============================================================
// DOM Traversal & Interactive Profile Project
// Data -> Logic -> Rendering
// ============================================================

// -------------------------
// 1. DATA
// -------------------------

const profile = {
  name: "Aditya Sharma",
  bio: "Frontend developer who enjoys building accessible and interactive web experiences.",
  skills: ["HTML", "CSS", "JavaScript", "DOM", "Git"]
};

const faqs = [
  {
    question: "What is DOM traversal?",
    answer: "DOM traversal means moving through relationships in the DOM tree, such as parent, child, sibling, and nearest matching ancestor."
  },
  {
    question: "What does parentElement return?",
    answer: "parentElement returns the parent Element of an element, or null when there is no parent element."
  },
  {
    question: "What does children return?",
    answer: "children returns a live HTMLCollection containing the element's child elements."
  },
  {
    question: "Why is closest() useful?",
    answer: "closest() starts at an element and moves upward until it finds the nearest ancestor, including the element itself, that matches a CSS selector."
  }
];

const quotes = [
  {
    text: "The best way to learn JavaScript is to build with it.",
    author: "Practice Principle"
  },
  {
    text: "Small experiments lead to strong programming intuition.",
    author: "Learning Note"
  },
  {
    text: "Readable code is easier to debug, teach, and maintain.",
    author: "Engineering Principle"
  },
  {
    text: "Understand the DOM tree before changing the DOM tree.",
    author: "DOM Principle"
  }
];

// -------------------------
// 2. SELECTION
// -------------------------

const profileCard = document.querySelector("#profileCard");
const profileName = document.querySelector("#profileName");
const profileBio = document.querySelector("#profileBio");
const skillsContainer = document.querySelector("#skills");
const profileMessage = document.querySelector("#profileMessage");

const faqList = document.querySelector("#faqList");

const quoteText = document.querySelector("#quoteText");
const quoteAuthor = document.querySelector("#quoteAuthor");
const quoteBtn = document.querySelector("#quoteBtn");

const themeBtn = document.querySelector("#themeBtn");

// -------------------------
// 3. RENDERING
// -------------------------

function renderProfile(data) {
  profileName.textContent = data.name;
  profileBio.textContent = data.bio;

  skillsContainer.replaceChildren();

  const fragment = document.createDocumentFragment();

  data.skills.forEach((skillName) => {
    const skill = document.createElement("span");
    skill.classList.add("skill");
    skill.textContent = skillName;
    fragment.append(skill);
  });

  skillsContainer.append(fragment);
}

function renderFaq(items) {
  faqList.replaceChildren();

  const fragment = document.createDocumentFragment();

  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.classList.add("faq-item");
    article.dataset.index = index;

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("faq-question");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = `
      <span>${item.question}</span>
      <span aria-hidden="true">+</span>
    `;

    const answer = document.createElement("p");
    answer.classList.add("faq-answer", "hidden");
    answer.textContent = item.answer;

    article.append(button, answer);
    fragment.append(article);
  });

  faqList.append(fragment);
}

function renderQuote(quote) {
  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `— ${quote.author}`;
}

// -------------------------
// 4. LOGIC
// -------------------------

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  renderQuote(quotes[randomIndex]);
}

function handleProfileAction(action) {
  if (action === "greet") {
    profileMessage.textContent = `Hello! Welcome to ${profile.name}'s profile.`;
  }

  if (action === "highlight") {
    profileCard.classList.toggle("highlight");
    profileMessage.textContent = profileCard.classList.contains("highlight")
      ? "Profile card highlighted."
      : "Profile highlight removed.";
  }
}

function toggleFaq(button) {
  // closest() finds the nearest FAQ item from the clicked button.
  const item = button.closest(".faq-item");

  if (!item) {
    return;
  }

  const answer = item.querySelector(".faq-answer");
  const isOpen = button.getAttribute("aria-expanded") === "true";

  answer.classList.toggle("hidden", isOpen);
  button.setAttribute("aria-expanded", String(!isOpen));

  const icon = button.querySelector("span:last-child");
  if (icon) {
    icon.textContent = isOpen ? "+" : "−";
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  const darkMode = document.body.classList.contains("dark");
  themeBtn.setAttribute("aria-pressed", String(darkMode));
  themeBtn.textContent = darkMode ? "Light Theme" : "Dark Theme";
}

// -------------------------
// 5. EVENTS
// -------------------------

profileCard.addEventListener("click", (event) => {
  // closest() lets one parent handle clicks from multiple buttons.
  const button = event.target.closest(".profile-action");

  if (!button) {
    return;
  }

  handleProfileAction(button.dataset.action);
});

faqList.addEventListener("click", (event) => {
  const button = event.target.closest(".faq-question");

  if (!button) {
    return;
  }

  toggleFaq(button);
});

quoteBtn.addEventListener("click", showRandomQuote);
themeBtn.addEventListener("click", toggleTheme);

// -------------------------
// 6. DOM TRAVERSAL DEMOS
// -------------------------

function demonstrateTraversal() {
  // parentElement
  console.log("FAQ list parent:", faqList.parentElement);

  // children
  console.log("FAQ list children:", faqList.children);
  console.log("Number of FAQ items:", faqList.children.length);

  // first child
  console.log("First FAQ item:", faqList.children[0]);

  // closest
  const firstQuestion = faqList.querySelector(".faq-question");
  console.log(
    "Closest FAQ item:",
    firstQuestion ? firstQuestion.closest(".faq-item") : null
  );
}

// -------------------------
// 7. INITIAL RENDER
// -------------------------

renderProfile(profile);
renderFaq(faqs);
showRandomQuote();
demonstrateTraversal();
