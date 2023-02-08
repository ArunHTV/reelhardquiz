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
    {
        question: "In Empire Strikes Back, what was Vader's response to Luke's accusation of killing his father",
        choice1: "Luke, I am your father",
        choice2: "I am your father, Luke",
        choice3: "No, I am your father",
        choice4: "Your father is still alive",
        answer: 3,
    },
    {
        question: "Who played The Monster in the 1943 horror film, Frankenstein Meets The Wolf Man?",
        choice1: "Lon Chaney Jr",
        choice2: "Boris Karloff",
        choice3: "Glenn Strange",
        choice4: "Bela Lugosi",
        answer: 4,
    },
    {
        question: 'Where was the Tim Burton-directed 1989 comic book adaptation Batman filmed?',
        choice1: 'Pinewood Studios, England',
        choice2: 'Warner Brothers Studios, Hollwood USA',
        choice3: 'Warner Brothers Studios, Burbank USA',
        choice4: 'Skellington Productions, Burbank USA',
        answer: 1,
    },
    {
        question: 'For which role did Leonardo DiCaprio win his first best actor Oscar?',
        choice1: 'Jordan Belfort in The Wolf of Wall Street',
        choice2: 'Hugh Glass in The Revenant',
        choice3: 'Calvin J. Candie in Django Unchained',
        choice4: 'Edward Daniels in Shutter Island',
        answer: 2,
    },
    {
        question: 'Which professional wrestler starred in the lead role in 1988 sci-fi/action movie, They Live?',
        choice1: 'The Ultimate Warrior',
        choice2: 'Andre The Giant',
        choice3: 'Hulk Hogan',
        choice4: 'Roddy Piper',
        answer: 4,
    },

    {
        question: 'Who composed the Lord of The Rings movie trilogy?',
        choice1: 'Howard Shore',
        choice2: 'James Horner',
        choice3: 'John Williams',
        choice4: 'Danny Elfman',
        answer: 1,
    },
    {
        question: 'For which movie did Christopher Nolan make his feature-length directorial debut?',
        choice1: 'Doodlebug',
        choice2: 'Insomnia',
        choice3: 'Following',
        choice4: 'Memento',
        answer: 3,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign('gameover.html');
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
