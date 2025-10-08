
let questions = [
    { 
       question: "What is the name of Joe's first major love interest?",
       answers: ["Beck", "Love", "Peach", "Candace"],
       correct: 0
    },
    {
        question: "Where does Joe work in New York?",
        answers: ["Library", "Coffee shop", "Bookstore", "Music store"],
        correct: 2
    },
    {
        question: "Who is Beck's wealthy best friend?",
        answers: ["Delilah", "Love", "Karen", "Peach"],
        correct: 3
    },
    {
        question: "What is the name of Joe's young neighbor?",
        answers: ["Theo", "Forty", "Paco", "Gabe"],
        correct: 2,
    },
    {
        question: "Who is Joe's new love interest in Los Angeles?",
        answers: ["Delilah", "Love", "Candace", "Ellie"],
        correct: 1,
    },
    {
        question: "What alias does Joe use in season 2",
        answers: ["Will Bettelheim", "Jonathan Moore", "Ben Ashby", "David Fincher"],
        correct: 0,
    },
    {
        question: "Who is Love's twin brother?",
        answers: ["Henry", "Theo", "Milo", "Forty"],
        correct: 3,
    },
    {
        question: "What is the name of Joe and love's baby?",
        answers: ["Henry", "James", "Lucas", "Theo"],
        correct: 0,
    },
    {
        question: "Who is Joe's new neighbor that he becomes obsessed with?",
        answers: ["Sherry", "Nathalie", "Marienne", "Delilah"],
        correct: 1,
    },
    {
        question: "Who is the librarian that Joe falls for?",
        answers: ["Ellie", "Love", "Marienne", "Julia"],
        correct: 2,
    },
    {
        question: "Which hobby do Joe and Love take up together to appear normal?",
        answers: ["Painting", "Beekeeping", "Gardening", "Baking"],
        correct: 1,
    },
    {
        question: "Where does season 4 mainly take place?",
        answers: ["Paris", "London", "Los Angeles", "Rome"],
        correct: 1,
    },
    {
        question: "What alias does Joe use in season 4?",
        answers: ["Will Bettelheim", "Edwad Hall", "Patrick Reed", "Johnatan Moore"],
        correct: 3,
    },
    {
        question: "Which group of wealthy friends does Joe get involved with in London?",
        answers: ["The Rich kids", "The Eat The Rich Club", "The Royal Circle", "The Soho crew"],
        correct: 1,
    },
    {
        question: "Who turns out to be the real 'Eat The Rich' killer in season 4?",
        answers: ["Joe", "Marienne", "Rhys Montrose", "Kate"],
        correct: 2,
    },
    {
        question: "What is Joe's favorite place to stalk his crush in season 1?",
        answers: ["Coffee shop", "Bookstore", "Social media", "Library"],
        correct: 1,
    },
    {
        question: "Who is Joe's ex-girlfriend that comes back unexpectedly in season 2?",
        answers: ["Love", "Beck", "Candace", "Marienne"],
        correct: 2,
    },
    {
        question: "What alias does Joe use when meeting people in season 3?",
        answers: ["Jonathan Moore", "Will Bettelheim", "Edward Hall", "Patrick Reed"],
        correct: 1,
    },
    {
        question: "What is Joe's favorite way to learn about someone?",
        answers: ["Stalking their social media", "Talking to them directly", "Asking mutual friends", "Reading books"],
        correct: 0,
    },
    {
        question: "How many people has Joe killed throughout the series?",
        answers: ["5", "12", "24", "35"],
        correct: 2,
    },
]


let currentQuestion = 0; // bijhouden welke vraag je nu hebt.
let score = 0; // score bijhouden
let fiftyUses = 0; // telt hoeveel keer je hem hebt gebruikt
const maxFiftyUses = 5; // maximaal aantal keer

function showQuestion() {
  let q = questions[currentQuestion];
  document.querySelector(".quiz-question").textContent = q.question;
  
let buttons = document.querySelectorAll (".answer-btn");
buttons.forEach ((btn, i) =>  {
btn.textContent = q.answers [i];
btn.classList.remove ("correct", "wrong");
btn.disabled = false;
btn.onclick = () => checkAnswer (i, btn);
})
}

function checkAnswer(i, btn) {
  let q = questions[currentQuestion];


  if (i === q.correct) {
    btn.classList.add("correct");
    score++;
    scoreDisplay.textContent = score; 
  } else {
    btn.classList.add("wrong");
  }
   
  let buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.classList.add("correct");
    }
  });
}

const nextBtn = document.querySelector(".next-question-btn");
const questionStatus = document.querySelector(".question-status b");
const scoreDisplay = document.querySelector(".score b");


nextBtn.addEventListener("click", () => {
  currentQuestion++;            
  if(currentQuestion < questions.length) {
    showQuestion();             
    questionStatus.textContent = currentQuestion + 1; 
  } 
  });


showQuestion();

