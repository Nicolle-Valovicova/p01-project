let questionShow = document.getElementById("questionShow");
let answersShow = document.querySelectorAll(".answersShow");
let prevBtn = document.getElementById("backbtn");
let nextBtn = document.getElementById("nextBtn");
let powerUp = document.getElementById("powerUp");
let scoreShow = document.getElementById("score");
let winFeedbackScreen = document.getElementById("win");
let loseFeedbackScreen = document.getElementById("lose");
let finalScore = document.querySelector(".finalScore");
let retryBtn = document.querySelector(".rettryBtn");
let homeBtn = document.querySelector(".homeBtn");
let score = 0;
let ourQuestions = "questions.json";
// shuffle function for ramdom ex. answers
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
// the loaded in questions
fetch(ourQuestions)
  .then((res) => res.json())
  .then((data) => {
    // //console.log(data.nicolle);
    let currentIndex = 0;
    //shuffled options for quiz

    showQuestion(currentIndex); //display the different questions by using the next button
    showOptions(currentIndex);
    nextBtn.addEventListener("click", function () {
      currentIndex++;
      if (currentIndex < data.nicolle.length) {
        showQuestion(currentIndex);
        showOptions(currentIndex);
        resetBgColor();
        allVisible();
      } else {
        endQuiz();
      }
    });

    prevBtn.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;

        showQuestion(currentIndex);
        showOptions(currentIndex);
        resetBgColor();
        allVisible();
      } else {
        console.log("nothing works");
      }
    });
    function showQuestion(currentIndex) {
      questionShow.innerHTML = data.nicolle[currentIndex].question;
    } //display the questions in your html
    function showOptions(currentIndex) {
      const opts = data.nicolle[currentIndex].options;
      const shuffled = shuffle([...opts]);
      answersShow.forEach((li, i) => {
        // show the options fron json array in the html shuffled
        li.innerHTML = shuffled[i];
      });
      // //console.log("options:", opts);
      //// console.log("shuffled:", shuffled);
    } //display your optionns in html

    // show whichones clicked and right
    //function for changing the bg color on right/ wrong answer
    answersShow.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.innerText === data.nicolle[currentIndex].answer) {
          btn.style.backgroundColor = "#72bf6a";
          drawScore();
        } else {
          btn.style.backgroundColor = "#f94449";
        }
      });
    });
    // function clearing bg color on answer when clicked to next question
    function resetBgColor() {
      answersShow.forEach((btn) => {
        btn.style.backgroundColor = "#ffb100";
      });
    }

    powerUp.addEventListener("click", function () {
      const correctAns = data.nicolle[currentIndex].answer;
      const buttons = Array.from(answersShow);
      const correcBtn = buttons.find((b) => b.innerText === correctAns);
      const wrongBtn = buttons.filter((b) => b.innerText !== correctAns);

      const keepWrong = wrongBtn[Math.floor(Math.random() * wrongBtn.length)];

      wrongBtn.forEach((b) => {
        if (b !== keepWrong) b.style.visibility = "hidden";
      });
    });
    function allVisible() {
      answersShow.forEach((b) => {
        b.style.visibility = "visible";
      });
    }

    // draw score functiion
    function drawScore() {
      score++;
      scoreShow.innerText = "Score: " + score + "/20";
      finalScore.innerText = "Final score: " + score + "/20";
      console.log(finalScore.innerText);
    }
    function endQuiz() {
      quiz.hidden = true;
      toggleFeedback();
      console.log("quiz finished score: ", score);
    }
    // code for showing feedbackscreen

    function toggleFeedback() {
      console.log("final score:", score);
      if (score >= 10) {
        winFeedbackScreen.style.display = "flex";
        loseFeedbackScreen.style.display = "none";
      } else {
        winFeedbackScreen.style.display = "none";
        loseFeedbackScreen.style.display = "flex";
      }
    }
  });

// js for switching betwheen pages
let backToHomePage = document.getElementById("goToHome");
let startTheQuiz = document.getElementById("startTheQuiz");
let closeQuiz = document.getElementById("closeQuiz");

let quiz = document.getElementById("quiz");
let startScreen = document.getElementById("startScreen");
// ! change to true when you want to hide the quiz at the start

startScreen.hidden = true;
quiz.hidden = true;
startTheQuiz.addEventListener("click", () => {
  startScreen.hidden = true;
  quiz.hidden = false;
});
closeQuiz.addEventListener("click", () => {
  startScreen.hidden = false;
  quiz.hidden = true;
});
backToHomePage.addEventListener("click", () => {
  startScreen.hidden = true;
  // TODO: HERE COMES THE HOME PAGE.hidden = true;
});
retryBtn.addEventListener("click", () => {
  quiz.hidden = false;
  winFeedbackScreen.style.display = "none";
  loseFeedbackScreen.style.display = "none";
});
homeBtn.addEventListener("click", () => {
  // TODO: HERE COMES THE HOME PAGE .hidden = false;
  winFeedbackScreen.style.display = "none";
  loseFeedbackScreen.style.display = "none";
});
