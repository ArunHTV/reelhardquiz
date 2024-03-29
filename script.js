//question and scoring/max question coding taken from tutorial:https://www.youtube.com/watch?v=zZdQGs62cR8&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=4

//QUESTIONS AND SCORING SCRIPT

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
        question: "In Empire Strikes Back, what was Vader's retort to Luke's accusation of killing his father",
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
        question: 'Where was the 1989 comic book movie Batman filmed?',
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
        question: 'Which professional wrestler had the lead role in 1988 sci-fi/action movie, They Live?',
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
        question: 'Which movie featured Christopher Nolans directorial feature-length debut?',
        choice1: 'Doodlebug',
        choice2: 'Insomnia',
        choice3: 'Following',
        choice4: 'Memento',
        answer: 3,
    },
    {
        question: 'Who wrote & directed the original Plan 9 From Outer Space?',
        choice1: 'Tim Burton',
        choice2: 'Ed Wood',
        choice3: 'Ridley Scott',
        choice4: 'Robert Wise',
        answer: 2,
    },
    {
        question: 'Which now-famous Martial Artist had an uncredited role in Enter The Dragon?',
        choice1: 'Jackie Chan',
        choice2: 'Sammo Hung',
        choice3: 'Chuck Norris',
        choice4: 'Chow Yun-fat',
        answer: 1,
    },
    {
        question: 'In which fictional town is infamous horror movie Troll 2 set?',
        choice1: 'Nomed',
        choice2: 'Nilmerg',
        choice3: 'Llort',
        choice4: 'Nilbog',
        answer: 4,
    },
    {
        question: 'What make is the titular car in Dude, Wheres My Car?',
        choice1: 'Peugeot 205',
        choice2: 'Renault Le Car',
        choice3: 'Fiat Seicento',
        choice4: 'Volkswagen Golf',
        answer: 2,
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

//incorrect/correct feed back code from tutorial taken from:https://www.youtube.com/watch?v=_LYxkClHnV0&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=5

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
