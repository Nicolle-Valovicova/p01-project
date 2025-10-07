const questionElement = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const fiftyFiftyBtn = document.getElementById("fiftyFiftyBtn");


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let currentIndex = 0;
let correctAnswersCount = 0;
let answeredQuestions = new Set();


const SCORE_POINTS = 100;
const MAX_QUESTIONS = 20; 


let questions = [
  {
    question: 'Which Cookie is the first playable character you receive at the start of the game?',
    Choice1: 'Stardust',
    Choice2: 'GingerBread',
    Choice3: 'Kiwi',
    Choice4: 'Donut',
    answer: 2,
  },
  {
    question: 'Who owns Cookie run: Kingdom?',
    Choice1: 'TevBlock',
    Choice2: 'Cookie run',
    Choice3: 'Devsisters',
    Choice4: 'Remba',
    answer: 3,
  },
  {
    question: 'When did the game come out?',
    Choice1: 'October 2007',
    Choice2: 'September 2024',
    Choice3: 'April 2003',
    Choice4: 'January 2021',
    answer: 4,
  },
  {
    question: 'What type of Cookie is GingerBrave?',
    Choice1: 'Defense',
    Choice2: 'Support',
    Choice3: 'Bomber',
    Choice4: 'Magic',
    answer: 3,
  },
  {
    question: 'How many versions of the game are there?',
    Choice1: '1',
    Choice2: '4',
    Choice3: '6',
    Choice4: '2',
    answer: 4,
  },
  {
    question: 'If there is a different version of the game then what is it?',
    Choice1: 'Cookie run: Kingdom CN',
    Choice2: 'There is no other version',
    Choice3: 'Cookie run: Kingdom NK',
    Choice4: 'There is just the global one',
    answer: 1,
  },
  {
    question: 'What is the other company?',
    Choice1: 'There is no other company)',
    Choice2: 'Tencent Games (China)',
    Choice3: 'Mizaki',
    Choice4: 'Climana',
    answer: 2,
  },
  {
    question: 'How many cookie types are there?',
    Choice1: '4',
    Choice2: '12',
    Choice3: '8',
    Choice4: '16',
    answer: 3,
  },
  {
    question: 'What element would a cookie like Pure Vanilla be?',
    Choice1: 'Light',
    Choice2: 'Darkness',
    Choice3: 'Water',
    Choice4: 'Lighting',
    answer: 1,
  },
  {
    question: 'How many episodes are there?',
    Choice1: '12 episodes of Crispia and 14 episodes of Beast-Yeast, totaling 26.',
    Choice2: '20 episodes of Crispia and 12 episodes of Beast-Yeast, totaling 32.',
    Choice3: '35 episodes of Crispia and 18 episodes of Beast-Yeast, totaling 53.',
    Choice4: '18 episodes of Crispia and 10 episodes of Beast-Yeast, totaling 28.',
    answer: 4,
  },
  {
    question: 'What is the name of the cookie that is the opposite of Pure Vanilla Cookie',
    Choice1: 'Deceit',
    Choice2: 'Blue Jester',
    Choice3: 'Shadow milk cookie',
    Choice4: 'Corruptor',
    answer: 3,
  },
  {
    question: 'Which are the names of the Ancient cookies?',
    Choice1: 'Pure Vanilla Cookie, Hollyberry Cookie, Dark Cacao Cookie, Golden Cheese Cookie, White Lily Cookie',
    Choice2: 'Burning Spice Cookie,Eternal Sugar Cookie,Mystic Flour Cookie,Shadow Milk Cookie,Silent Salt Cookie',
    Choice3: 'There are no Ancients',
    Choice4: 'Butter cookie, Apple Cookie, Boba Cookie, Coral Cookie',
    answer: 1,
  },
  {
    question: 'How many Beasts are there?',
    Choice1: '2',
    Choice2: '6',
    Choice3: '8',
    Choice4: '5',
    answer: 4,
  },
  {
    question: 'Does Cookie run: Kingdom do April fools updates?',
    Choice1: 'They only did it once',
    Choice2: 'No',
    Choice3: 'Yes but only once every 2 years',
    Choice4: 'Yes, each year',
    answer: 4,
  },
  {
    question: 'What is the maximum number of Cookies you can deploy in a single team for most game modes?',
    Choice1: '6',
    Choice2: '5',
    Choice3: '4',
    Choice4: '8',
    answer: 2,
  },
  {
    question: 'Aside from pulling them from the Gacha, what is the primary way to obtain a Cookies Soulstones to unlock them?',
    Choice1: 'Chests',
    Choice2: 'Rewards',
    Choice3: 'The Mileage Shop',
    Choice4: 'Buying with real money',
    answer: 3,
  },
  {
    question: 'Which game mode allows you to set defensive teams and battle other players teams for rewards?',
    Choice1: 'Kingdom Arena',
    Choice2: 'Battle mode',
    Choice3: 'Guild battles',
    Choice4: 'PvP Colosseum',
    answer: 1,
  },
  {
    question: 'How to make your cookies stronger?',
    Choice1: 'Leveling Up, Upgrading Skills, Promotion, Ascension, Toppings, Treasures',
    Choice2: 'Level up building, Buy more cookie dough, Train them',
    Choice3: 'Buying gems, Watching ads, Completing quests',
    Choice4: 'Joining guilds, Participating in events, Buying costumes',
    answer: 1,
  },
  {
    question: 'How long do events usually last?',
    Choice1: '26 days',
    Choice2: '30 days',
    Choice3: '45 days',
    Choice4: '15 days',
    answer: 2,
  },
  {
    question: 'Which Cookie is known as the leader of the Dark Enchantress\'s army?',
    Choice1: 'Pomegranate Cookie ',
    Choice2: 'Licorice Cookie',
    Choice3: 'Dark Enchantress Cookie',
    Choice4: 'Espresso Cookie',
    answer: 3,
  }


];

// Initialize the game
function initGame() {
  console.log("🎮 Initializing game...");

  // Clear any previous data
  clearPreviousData();

  // Add event listeners
  nextBtn.addEventListener("click", goToNextQuestion);
  prevBtn.addEventListener("click", goToPreviousQuestion);
  fiftyFiftyBtn.addEventListener("click", useFiftyFifty);

  // Add click listeners to choices
  choices.forEach(choice => {
    choice.addEventListener('click', handleChoiceClick);
  });

  // Start the game
  startGame();
}

// Clear previous quiz data
function clearPreviousData() {
  localStorage.removeItem('mostRecentScore');
  localStorage.removeItem('correctAnswers');
  localStorage.removeItem('totalQuestions');
  localStorage.removeItem('quizCompleted');
  console.log("🧹 Cleared previous quiz data");
}

// Start the game
function startGame() {
  console.log("🚀 Starting game...");
  questionCounter = 0;
  score = 0;
  correctAnswersCount = 0;
  currentIndex = 0;
  answeredQuestions.clear();
  availableQuestions = [...questions];

  updateScore();
  getNewQuestion();
}

// Get a new question
function getNewQuestion() {
  console.log(`📊 Progress: ${questionCounter}/${MAX_QUESTIONS}, Answered: ${answeredQuestions.size}`);

  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    if (answeredQuestions.size < MAX_QUESTIONS) {
      showCompletionWarning();
      return;
    }
    endGame();
    return;
  }

  questionCounter++;
  updateProgress();

  // Get random question
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[randomIndex];
  currentIndex = questions.findIndex(q => q === currentQuestion);

  // Remove the question from available questions
  availableQuestions.splice(randomIndex, 1);

  // Display the question and options
  showQuestion(currentIndex);
  showOptions(currentIndex);

  acceptingAnswers = true;
  resetFiftyFifty();
  updateNavigationButtons();

  console.log("❓ New question loaded:", currentQuestion.question);
}

// Show question
function showQuestion(index) {
  questionElement.innerText = questions[index].question;
}

// Show options
function showOptions(index) {
  const question = questions[index];
  const optionTexts = [
    question.Choice1,
    question.Choice2,
    question.Choice3,
    question.Choice4
  ];

  choices.forEach((choice, i) => {
    choice.innerText = optionTexts[i];
    choice.dataset.number = (i + 1).toString();
  });
}

// Handle choice click
function handleChoiceClick(e) {
  if (!acceptingAnswers) return;

  acceptingAnswers = false;
  const selectedChoice = e.target;
  const selectedAnswer = parseInt(selectedChoice.dataset.number);

  console.log(`🎯 Answer selected: ${selectedAnswer}, Correct: ${currentQuestion.answer}`);

  // Mark this question as answered
  answeredQuestions.add(currentIndex);

  const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

  if (classToApply === 'correct') {
    incrementScore(SCORE_POINTS);
    correctAnswersCount++;
    console.log("✅ Correct! Score:", score, "Correct count:", correctAnswersCount);
  } else {
    console.log("❌ Incorrect!");
  }

  selectedChoice.parentElement.classList.add(classToApply);

  setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply);
    updateNavigationButtons();
    getNewQuestion();
  }, 1000);
}

// 50/50 Power-up
function useFiftyFifty() {
  if (!acceptingAnswers) return;

  console.log("🎲 Using 50/50 power-up!");

  const correctAnswerNumber = currentQuestion.answer;
  const correctChoice = document.querySelector(`.choice-text[data-number="${correctAnswerNumber}"]`);

  // Get all incorrect choices
  const incorrectChoices = choices.filter(choice => {
    return parseInt(choice.dataset.number) !== correctAnswerNumber;
  });

  // Shuffle and select two incorrect choices to hide
  const shuffledIncorrect = [...incorrectChoices].sort(() => Math.random() - 0.5);
  const choicesToHide = shuffledIncorrect.slice(0, 2);

  // Hide the selected incorrect choices
  choicesToHide.forEach(choice => {
    choice.parentElement.classList.add('hidden');
  });

  // Disable the power-up
  fiftyFiftyBtn.disabled = true;
  fiftyFiftyBtn.style.opacity = '0.5';
}

// Reset 50/50 for new question
function resetFiftyFifty() {
  // Show all choices
  choices.forEach(choice => {
    choice.parentElement.classList.remove('hidden');
  });

  // Enable the power-up
  fiftyFiftyBtn.disabled = false;
  fiftyFiftyBtn.style.opacity = '1';
}

// Navigation functions
function goToNextQuestion() {
  if (!answeredQuestions.has(currentIndex) && answeredQuestions.size < MAX_QUESTIONS) {
    alert('Please answer this question before moving to the next one!');
    return;
  }

  if (currentIndex < questions.length - 1 && questionCounter < MAX_QUESTIONS) {
    currentIndex++;
    questionCounter++;
    showQuestion(currentIndex);
    showOptions(currentIndex);
    updateProgress();
    acceptingAnswers = true;
    resetFiftyFifty();
    updateNavigationButtons();
  } else if (answeredQuestions.size >= MAX_QUESTIONS) {
    endGame();
  }
}

function goToPreviousQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    questionCounter--;
    showQuestion(currentIndex);
    showOptions(currentIndex);
    updateProgress();
    acceptingAnswers = true;
    resetFiftyFifty();
    updateNavigationButtons();
  }
}

// Update navigation buttons
function updateNavigationButtons() {
  const currentQuestionAnswered = answeredQuestions.has(currentIndex);

  if (nextBtn) {
    nextBtn.disabled = !currentQuestionAnswered && answeredQuestions.size < MAX_QUESTIONS;
    nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
  }
}

// Update progress
function updateProgress() {
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
}

// Update score
function updateScore() {
  scoreText.innerText = score;
}

// Increment score
function incrementScore(points) {
  score += points;
  updateScore();
}

// Show completion warning
function showCompletionWarning() {
  const unansweredCount = MAX_QUESTIONS - answeredQuestions.size;
  alert(`You need to answer all ${MAX_QUESTIONS} questions! You still have ${unansweredCount} question(s) left.`);
}

// End game - FIXED VERSION
function endGame() {
  console.log("🏁 Game completed!");
  console.log("📊 Final stats:", {
    score: score,
    correctAnswers: correctAnswersCount,
    totalQuestions: MAX_QUESTIONS,
    answeredQuestions: answeredQuestions.size
  });

  // Save data to localStorage - FIXED
  localStorage.setItem('mostRecentScore', score.toString());
  localStorage.setItem('correctAnswers', correctAnswersCount.toString());
  localStorage.setItem('totalQuestions', MAX_QUESTIONS.toString());
  localStorage.setItem('quizCompleted', new Date().getTime().toString());

  // Verify data was saved
  const savedScore = localStorage.getItem('mostRecentScore');
  const savedCorrect = localStorage.getItem('correctAnswers');
  const savedTotal = localStorage.getItem('totalQuestions');

  console.log("💾 Data saved to localStorage:", {
    savedScore: savedScore,
    savedCorrect: savedCorrect,
    savedTotal: savedTotal
  });

  // Show confirmation before redirect
  setTimeout(() => {
    console.log("🔀 Redirecting to end page...");
    window.location.href = 'end-Jessika.html';
  }, 500);
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);