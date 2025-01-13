const categories = {
  geographical: [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2,
    },
    {
      question: "Which continent is the Sahara Desert located on?",
      options: ["Asia", "Africa", "Australia", "South America"],
      correct: 1,
    },
    {
      question: " Which country produces the maximum sugar in the world?",
      options: ["USA", "India", "Cuba", " Brazil"],
      correct: 2,
    },
    {
      question: "What is the capital of Morocco?",
      options: ["Muscat", "Managua", "Ulan Bator", "Rabat"],
      correct: 3,
    },
    {
      question: "'Death Valley' is located in?",
      options: ["California US", "Kerala, India", "Israel", "Saudi Arabia"],
      correct: 0,
    },
  ],
  games_and_sport: [
    {
      question: "Which sport is known as the 'king of sports'?",
      options: ["Basketball", "Football", "Tennis", "Cricket"],
      correct: 1,
    },
    {
      question: "How many players are there in a soccer team?",
      options: ["9", "10", "11", "12"],
      correct: 2,
    },
    {
      question: " What sport is considered the most popular in the world?",
      options: ["Football", "Tennis", "Golf", "Basketball"],
      correct: 0,
    },
    {
      question: "Which team won the last World Hockey Championship?",
      options: ["Russia", "Canada", "United States", "Finland"],
      correct: 1,
    },
    {
      question: "What material is used for weights in most bicycle races?",
      options: ["Lead", "Glass", "Aluminum", "Concrete"],
      correct: 0,
    },
  ],
  technology: [
    {
      question: "Who is known as the father of the computer?",
      options: ["Alan Turing", "Charles Babbage", "Steve Jobs", "Bill Gates"],
      correct: 1,
    },
    {
      question:
        "What is part of a database that holds only one type of information?",
      options: ["Report", "Field", "Record", "File"],
      correct: 1,
    },
    {
      question:
        "Which is a type of Electrically-Erasable Programmable Read-Only Memory?",
      options: ["Flash", "Flange", "Fury", "FRAM"],
      correct: 0,
    },
    {
      question:
        "Made from a variety of materials, such as carbon, which inhibits the flow of current...?",
      options: ["Choke", "Inductor", "Resistor", "Capacitor"],
      correct: 2,
    },
    {
      question:
        "What is the relationship between resistivity r and conductivity s?",
      options: ["R = s2", "R = s", "R > s", "R = 1/s"],
      correct: 3,
    },
  ],
  science: [
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "H2"],
      correct: 1,
    },
    {
      question: "What planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      correct: 2,
    },
    {
      question:
        "Which of the following is a non metal that remains liquid at room temperature?",
      options: ["Phosphorous", "Bromine", "Chlorine", "Helium"],
      correct: 1,
    },
    {
      question:
        "Chlorophyll is a naturally occurring chelate compound in which central metal is",
      options: ["copper", "magnesium", "iron", "calcium"],
      correct: 1,
    },
    {
      question: "Which of the following is used in pencils?",
      options: ["Graphite", "Silicon", "Charcoal", "Phosphorous"],
      correct: 0,
    },
    {
      question:
        "Which of the following metals forms an amalgam with other metals?",
      options: ["Tin", "Mercury", "Lead", "Zinc"],
      correct: 1,
    },
  ],
  history: [
    {
      question: "Who was the first President of the United States?",
      options: [
        "Abraham Lincoln",
        "George Washington",
        "John Adams",
        "Thomas Jefferson",
      ],
      correct: 1,
    },
    {
      question: "During which war was the Battle of Gettysburg fought?",
      options: [
        "World War I",
        "World War II",
        "The Civil War",
        "The Revolutionary War",
      ],
      correct: 2,
    },
    {
      question: " In which city did World War 1 start?",
      options: ["Paris", "Sarajevo ", "Istanbul", "Berlin"],
      correct: 1,
    },
    {
      question: "What was the name of the Soviet intelligence agency?",
      options: ["ICBM", "DMZ", "SSI", "KGB "],
      correct: 3,
    },
    {
      question: "Greenland was a colony of which country until 1981?",
      options: ["Denmark", "Norway", "USA", "UK"],
      correct: 0,
    },
  ],
};

let selectedCategory = [];
let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.querySelector(".quiz-container");
// quizContainer.style.display = "none";
const categoryButtonsContainer = document.createElement("div");
const categoriesTitle = document.createElement("h1");
categoriesTitle.textContent = "Select Categories";
categoriesTitle.className = "categories-title";

categoryButtonsContainer.className = "category-container";
document.body.prepend(categoriesTitle);
document.body.insertBefore(
  categoryButtonsContainer,
  categoriesTitle.nextSibling
);

Object.keys(categories).forEach((category) => {
  const button = document.createElement("button");
  button.textContent = category.replace(/_/g, " ").toUpperCase();
  button.className = "category-button";
  button.onclick = () => selectCategory(category);
  categoryButtonsContainer.appendChild(button);
});

function selectCategory(category) {
  selectedCategory = categories[category];
  currentQuestionIndex = 0;
  score = 0;
  quizContainer.style.display = "block";
  categoryButtonsContainer.style.display = "none";
  categoriesTitle.style.display = "none";
  loadQuestion();
}

const questionElement = document.getElementById("question");
const optionsElements = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");
const resetButton = document.querySelector(".reset");

resetButton.onclick = resetQuiz;

function loadQuestion() {
  const currentQuestion = selectedCategory[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  quizContainer.style.marginTop = "75px";
  optionsElements.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    button.classList.remove("correct", "wrong");
    button.disabled = false;
  });
  nextButton.style.display = "none";
}

function selectAnswer(optionIndex) {
  const currentQuestion = selectedCategory[currentQuestionIndex];
  optionsElements.forEach((button) => (button.disabled = true));

  if (optionIndex === currentQuestion.correct) {
    score++;
    optionsElements[optionIndex].classList.add("correct");
  } else {
    optionsElements[optionIndex].classList.add("wrong");
    optionsElements[currentQuestion.correct].classList.add("correct");
  }

  nextButton.style.display = "inline-block";
  scoreElement.textContent = `Score: ${score}`;
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < selectedCategory.length) {
    loadQuestion();
  } else {
    questionElement.textContent = "Quiz Completed!";
    document.querySelector(".options-container").style.display = "none";
    nextButton.style.display = "none";
    scoreElement.textContent = `Final Score: ${score}`;
    resetButton.style.display = "block";
    quizContainer.style.marginTop = "200px";
  }
}

function resetQuiz() {
  quizContainer.style.display = "none";
  categoryButtonsContainer.style.display = "flex";
  categoriesTitle.style.display = "block";
  document.querySelector(".options-container").style.display = "flex";
  nextButton.style.display = "none";
  score = 0;
  scoreElement.textContent = `Score: ${score}`;
}
