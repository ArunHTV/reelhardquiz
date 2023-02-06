const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'When was the first Star Wars film released?',
        choice1: '1973',
        choice2: '1980',
        choice3: '1977',
        choice4: '1978',
        answer: 3,
    },
    {
        question:
            "How many times has Samuel L Jackson starred in a Quentin Tarantino-directed film?",
        choice1: "5",
        choice2: "7",
        choice3: "8",
        choice4: "6",
        answer: 4,
    },
    {
        question: "Who played Wyatt Earp in the 1993 Western film, Tombstone?",
        choice1: "Kurt Russell",
        choice2: "Gene Hackman",
        choice3: "Russell Crowe",
        choice4: "Val Kilmer",
        answer: 1,
    },
    {
        question: "Who directed the 1985 black comedy classic, Brazil?",
        choice1: "Stanley Kubrick",
        choice2: "Robert Zemeckis",
        choice3: "Terry Gilliam",
        choice4: "John Waters",
        answer: 3,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptAnswers) return;

        acceptAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
          }
  
      selectedChoice.parentElement.classList.add(classToApply);
  
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });

  incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };
  
  startGame();
