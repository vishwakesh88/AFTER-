const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
    difficulty: 1
  },
  {
    question: "Which language is primarily used for web development?",
    choices: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript",
    difficulty: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Shakespeare", "Dickens", "Hemingway", "Fitzgerald"],
    answer: "Shakespeare",
    difficulty: 2
  },
  {
    question: "What is the largest planet in our Solar System?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
    difficulty: 2
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    choices: ["Lion", "Tiger", "Elephant", "Bear"],
    answer: "Lion",
    difficulty: 1
  }
];

let score = 0;
let level = 1;
let points = 0;
let currentQuestionIndex = 0;
let quizInterval;

function displayQuestion() {
  const question = getRandomQuestion();
  document.getElementById("question").textContent = question.question;
  
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  
  question.choices.forEach(choice => {
    const choiceLabel = document.createElement("label");
    const choiceInput = document.createElement("input");
    choiceInput.type = "radio";
    choiceInput.name = "choice";
    choiceInput.value = choice;
    choiceLabel.appendChild(choiceInput);
    choiceLabel.appendChild(document.createTextNode(choice));
    choicesContainer.appendChild(choiceLabel);
  });
}

function getRandomQuestion() {
  // Randomly select a question based on the current level
  const filteredQuestions = questions.filter(q => q.difficulty <= level);
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
}

function nextQuestion() {
  const selectedChoice = document.querySelector('input[name="choice"]:checked');
  if (selectedChoice) {
    const selectedAnswer = selectedChoice.value;
    const currentQuestion = getRandomQuestion();

    if (selectedAnswer === currentQuestion.answer) {
      points += 10; // Add 10 points for a correct answer
    }

    // Check if the player has leveled up
    if (points >= level * 50) { // Every level-up requires 50 points
      level++;
    }

    updateUI();
    displayQuestion();
  }
}

function stopQuiz() {
  clearInterval(quizInterval);
  alert(`Quiz stopped! Your final score is ${points}`);
  document.getElementById("question-container").innerHTML = "<h2>Quiz Over!</h2>";
  document.getElementById("score-container").innerHTML = `<h2>Your Final Score: ${points}</h2>`;
}

function updateUI() {
  document.getElementById("score").textContent = points;
  document.getElementById("level").textContent = level;
  document.getElementById("points").textContent = points;
}

// Start the quiz
displayQuestion();
