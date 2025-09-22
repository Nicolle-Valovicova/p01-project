let questionShow = document.getElementById("questionShow");

fetch("questions.json").then(res => res.json()).then(data => {
    console.log(data);
})

/*Everyone pastes this code in their javascript */
let jessica = 