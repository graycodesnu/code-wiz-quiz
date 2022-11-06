//! Setup
var body = document.body;
var currentQIndex = -1;
var quizQuestions = [
  {
    question: "Commonly used data types DO NOT include",
    answers: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: 2,
  },
  {
    question: "The condition in an if/else statement is enclosed within _____.",
    answers: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
    correctAnswer: 2,
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    answers: [
      "Numbers and strings",
      "Other arrays",
      "Booleans",
      "All of the above",
    ],
    correctAnswer: 3,
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
    correctAnswer: 2,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "Terminal/bash", "For loops", "console.log"],
    correctAnswer: 3,
  },
];

console.log("QUESTION LOG", quizQuestions);

var time = 60;
var timer;
console.log("timer", timer);
var display = document.querySelector("#time");

//! Local storage
if (!localStorage.getItem("highScores")) {
  localStorage.setItem("highScores", JSON.stringify([]));
}

//* ******** Quiz Wiz Page ********

//! Display high scores if on quizWiz page
if (window.location.pathname === "/code-wiz-quiz/quizWizzes.html") {
  let scores = JSON.parse(localStorage.getItem("highScores"));
  let scoreBoard = document.querySelector("#scoreBoard");
  for (let i = 0; i < scores.length; i++) {
    let liEl = document.createElement("li");
    liEl.textContent = scores[i].name + " ** " + scores[i].score;
    scoreBoard.appendChild(liEl);
  }

  // Define clear and back buttons
  var clearBtn = document.getElementById("clearHighScores");
  var backBtn = document.getElementById("backButton");

  //! Reset quizWiz high scores
  if (clearBtn) {
    clearBtn.addEventListener("click", clearScores);
    function resetScores() {
      localStorage.setItem("highScores", jSON.stringify([]));
      console.log("resetting scoreboard");
      let scoreBoardList = document.getElementById("scoreBoard");
      scoreBoardList.innerHTML = "";
    }
  }

  //! Back to quiz home
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.open("./index.html");
    });
  }
} else {
  //* ******** Landing Page ********

  //! Start button
  var startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startQuiz);

  function startQuiz() {
    var startMessage = document.getElementById("startingQuiz");
    startMessage.style.display = "none";
    timer = setInterval(startTimer, 1000);
    displayQ();
  }

  //! Start Timer
  function startTimer() {
    time = time - 1;
    display.textContent = time;
    if (time <= 0) {
      quizComplete();
      alert("Out of time!");
    }
  }

  //! Call index and display questions
  function displayQ() {
    // If at the last q, return complete form
    if (currentQIndex >= 4) {
      return quizComplete();
    }
    currentQIndex++;
    console.log("currentQIndex", currentQIndex);

    //! Call questions
    var currentQ = quizQuestions[currentQIndex];

    var dataTypes = document.createElement("h1");
    var listEl = document.createElement("ol");
    listEl.addEventListener("click", function (e) {
      verifyQ(e);
    });
    var li1 = document.createElement("li");
    li1.setAttribute("id", "choice1");
    var li2 = document.createElement("li");
    li2.setAttribute("id", "choice2");
    var li3 = document.createElement("li");
    li3.setAttribute("id", "choice3");
    var li4 = document.createElement("li");
    li4.setAttribute("id", "choice4");

    dataTypes.textContent = currentQ.question;
    li1.textContent = currentQ.answers[0];
    li2.textContent = currentQ.answers[1];
    li3.textContent = currentQ.answers[2];
    li4.textContent = currentQ.answers[3];

    var questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = "";
    questionContainer.appendChild(dataTypes);
    dataTypes.appendChild(listEl);
    listEl.appendChild(li1);
    listEl.appendChild(li2);
    listEl.appendChild(li3);
    listEl.appendChild(li4);
  }
  //! Verify user's selection, count correct questions
  var correctQCount = 0;

  function verifyQ(e) {
    let currentQ = quizQuestions[currentQIndex];
    let rightChoiceIndex = currentQ.correctAnswer;
    let rightChoiceContent = currentQ.answers[rightChoiceIndex];
    let result = document.createElement("p");
    var questionContainer = document.getElementById("questionContainer");
    questionContainer.appendChild(result);

    if (e.target.textContent === rightChoiceContent) {
      correctQCount++;
      result.textContent = "Right on!";
    } else {
      result.textContent = "Try again!";
      time -= 10;
    }
    setTimeout(displayQ, 1000);
  }

  function quizComplete() {
    clearInterval(timer);
    var score = document.querySelector(".score");

    var completedEl = document.querySelector(".completed");
    completedEl.style.display = "block";

    var hideQs = document.querySelector("#questionContainer");
    hideQs.style.display = "none";
    score.textContent = `Final score: ${time}`;

    quizWizzes();
  }

  //! Submit high scores
  function quizWizzes() {
    var submitScore = document.querySelector("#submitButton");
    submitScore.addEventListener("click", () => {
      let inputInitials = document.querySelector("#inputInitials");
      let initials = inputInitials.value;
      let previousScores = JSON.parse(localStorage.getItem("highScores"));
      previousScores.push({
        name: initials,
        score: time,
      });
      localStorage.setItem("highScores", JSON.stringify(previousScores));
      window.open("./quizWizzes.html");
    });
  }
}
