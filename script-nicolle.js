let questionShow = document.getElementById("questionShow");
let answersShow = document.querySelectorAll("answersShow");
let prevBtn = document.getElementById("backbtn");
let nextBtn = document.getElementById("nextBtn");
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
    console.log(data.nicolle);
    let currentIndex = 0;

    let randomAnswers = shuffle(data.nicolle[0].options);
    console.log(randomAnswers);
    document.querySelectorAll(".answersShow").forEach((li, i) => {
      li.innerHTML = randomAnswers[i];
    }); //shuffled options for quiz

    showQuestion(currentIndex); //display the different questions by using the next button
    showOptions(currentIndex);
    nextBtn.addEventListener("click", function () {
      currentIndex++;
      if (currentIndex < data.nicolle.length) {
        showQuestion(currentIndex);
        showOptions(currentIndex);
      } else {
        console.log("quiz finished");
      }
      console.log("btn clicked");
    });
    prevBtn.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;

        showQuestion(currentIndex);
        console.log("tz");
      } else {
        console.log("ehfehfugzgfwuzguwzg");
      }
    });
    function showQuestion(currentIndex) {
      questionShow.innerHTML = data.nicolle[currentIndex].question;
    } //display the questions in your html
    function showOptions(currentIndex) {
      document.querySelectorAll(".answersShow").forEach((li, i) => {
        li.innerHTML = randomAnswers[currentIndex];
      });
    } //display your optionns i html
  });

// js for switching betwheen pages
let backToHomePage = document.getElementById("goToHome");
let startTheQuiz = document.getElementById("startTheQuiz");
let closeQuiz = document.getElementById("closeQuiz");

let quiz = document.getElementById("quiz");
let startScreen = document.getElementById("startScreen");

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
  // HERE COMES THE HOME PAGE.hidden = true;
});

