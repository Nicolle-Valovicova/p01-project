let questionShow = document.getElementById("questionShow");
let answersShow = document.querySelectorAll(".answersShow");
let prevBtn = document.getElementById("backbtn");
let nextBtn = document.getElementById("nextBtn");
let powerUp = document.getElementById("powerUp");

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
    //shuffled options for quiz

    showQuestion(currentIndex); //display the different questions by using the next button
    showOptions(currentIndex);
    nextBtn.addEventListener("click", function () {
      currentIndex++;
      if (currentIndex < data.nicolle.length) {
        showQuestion(currentIndex);
        showOptions(currentIndex);
        resetBgColor();
      } else {
        console.log("and nothing shows");
      }
      console.log("btn clicked");
    });
    prevBtn.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;

        showQuestion(currentIndex);
        showOptions(currentIndex);
        resetBgColor();
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
      answersShow.forEach((li, i) => { // show the options fron json array in the html shuffled
        li.innerHTML = shuffled[i];
      });
      console.log("options:", opts);
      console.log("shuffled:", shuffled);
    } //display your optionns i html

    // show whichones clicked and right
    
    answersShow.forEach((btn) => { //function for changing the bg color on right/ wrong answer
      btn.addEventListener("click", () => {
        if (btn.innerText === data.nicolle[currentIndex].answer){
          btn.style.backgroundColor = "#72bf6a"
        } else{
          btn.style.backgroundColor = "#f94449";
        }
      });
    });
   function resetBgColor(){ // function clearing bg color on answer when clicked to next question
    answersShow.forEach((btn) => {
      btn.style.backgroundColor = "#ffb100";
    })
   }

   powerUp.addEventListener("click", )

  });

// js for switching betwheen pages
let backToHomePage = document.getElementById("goToHome");
let startTheQuiz = document.getElementById("startTheQuiz");
let closeQuiz = document.getElementById("closeQuiz");

let quiz = document.getElementById("quiz");
let startScreen = document.getElementById("startScreen");
startScreen.hidden = true;
quiz.hidden = false;
// startTheQuiz.addEventListener("click", () => {
//   startScreen.hidden = true;
//   quiz.hidden = false;
// });
// closeQuiz.addEventListener("click", () => {
//   startScreen.hidden = false;
//   quiz.hidden = true;
// });
// backToHomePage.addEventListener("click", () => {
//   startScreen.hidden = true;
//   // HERE COMES THE HOME PAGE.hidden = true;
// });
