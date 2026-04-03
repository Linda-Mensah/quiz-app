const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "Rome"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Mark Twain",
      "Jane Austen",
    ],
    correct: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    correct: 2,
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "Brazil", "UK", "Russia"],
    correct: 1,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Gd", "Go"],
    correct: 1,
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Tiger", "Elephant", "Lion", "Leopard"],
    correct: 2,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correct: 2,
  },
  {
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "80°C", "100°C", "120°C"],
    correct: 2,
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "French", "English"],
    correct: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2,
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: 2,
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    correct: 2,
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "South Korea"],
    correct: 1,
  },
  {
    question: "Who discovered gravity when he saw a falling apple?",
    options: [
      "Albert Einstein",
      "Isaac Newton",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    correct: 1,
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correct: 2,
  },
  {
    question: "Which organ pumps blood through the body?",
    options: ["Brain", "Lungs", "Heart", "Kidney"],
    correct: 2,
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correct: 1,
  },
  {
    question: "Which sport uses a racket and shuttlecock?",
    options: ["Tennis", "Badminton", "Squash", "Table Tennis"],
    correct: 1,
  },
  {
    question: "What is the currency of the United Kingdom?",
    options: ["Euro", "Dollar", "Pound Sterling", "Franc"],
    correct: 2,
  },
];

let questions = [...quizData].sort(() => Math.random() - 0.5);
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerElem = document.getElementById("timer");
const resultElem = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");
const themeToggle = document.getElementById("theme-toggle");

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();
  timer = setInterval(countdown, 1000);

  const q = questions[currentQuestion];

  questionElem.textContent = `Q${currentQuestion + 1}. ${q.question}`;

  // Clear previous options
  optionsElem.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn", "fade-in");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(index, true));
    optionsElem.appendChild(btn);
  });

  nextBtn.style.display = "none";

  updateProgress();
}

function countdown() {
  timeLeft--;
  updateTimer();
  if (timeLeft === 0) {
    clearInterval(timer);
    selectAnswer(questions[currentQuestion].correct, false);
  }
}

function updateTimer() {
  timerElem.textContent = `⏱️ ${timeLeft}`;
}

function selectAnswer(index, shouldScore) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  const optionsBtn = document.querySelectorAll(".option-btn");

  optionsBtn.forEach((btn) => (btn.disabled = true));

  if (index === q.correct) {
    optionsBtn[index].classList.add("correct");
    if (shouldScore) score++;
  } else {
    optionsBtn[index].classList.add("wrong");
    optionsBtn[q.correct].classList.add("correct");
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  nextBtn.style.display = "none";
  const highestScore = Number(localStorage.getItem("quizHighestScore") || 0);
  const isNew = score > highestScore;
  if (isNew) localStorage.setItem("quizHighestScore", score);

  resultElem.innerHTML = `
    <h2>Hurray! Quiz over!</h2>
    <p>You scored ${score} out of ${questions.length} questions</p>
    <p>Highest score is ${Math.max(score, highestScore)}</p>
    <button onclick="restartQuiz()">Restart quiz</button>
    ${isNew ? "<p>Hey, New high score!</p>" : ""}
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  resultElem.textContent = "";
  optionsElem.textContent = "";
  loadQuestion();
}

function updateProgress() {
  const progress = (currentQuestion / questions.length) * 100;
  if (progressBar) progressBar.style.width = `${progress}%`;
}

// Start quiz
loadQuestion();
