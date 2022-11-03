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

// TODO: Timer refactor
const time = 60;
timer;
console.log("timer", timer);
const display = document.querySelector("#time");

//! Local storage
if (!localStorage.getItem("highScores")) {
  localStorage.setItem("highScores", JSON.stringify([]));
}

//* ******** Landing Page ********

if (window.location.pathname === "/code-wiz-quiz/index.html") {
  //! Start button
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startQuiz);

  function startQuiz() {
    const startMessage = document.getElementById("startingQuiz");
    startMessage.style.display = "none";
    timer = setInterval(startTimer, 1000);
    displayQ();
  }

  function startTimer() {
    time = time = -1;
    display.textContent = time;
    if (time <= 0) {
      quizComplete();
      alert("Out of time!");
    }
  }

  function displayQ() {
    if (currentQIndex >= 4) {
      return quizComplete();
    }
    currentQIndex++;
    console.log("currentQIndex", currentQIndex);
  }

  //! Call questions
  const currentQ = quizQuestions[currentQIndex];

  const dataTypes = document.createElement("h1");
  const listEl = document.createElement("ol");
  listEl.addEventListener("click", function (e) {
    checkChoice(e);
  });
  const li1 = document.createElement("li");
  li1.setAttribute("id", "choice1");
  const li2 = document.createElement("li");
  li2.setAttribute("id", "choice2");
  const li3 = document.createElement("li");
  li3.setAttribute("id", "choice3");
  const li4 = document.createElement("li");
  li4.setAttribute("id", "choice4");

  dataTypes.textContent = currentQ.question;
  li1.textContent = currentQ.answers[0];
  li2.textContent = currentQ.answers[1];
  li3.textContent = currentQ.answers[2];
  li4.textContent = currentQ.answers[3];

  const questionContainer = document.getElementById("questionContainer");
  questionContainer.innerHTML = "";
  questionContainer.appendChild(dataTypes);
  dataTypes.appendChild(listEl);
  listEl.appendChild(li1);
  listEl.appendChild(li2);
  listEl.appendChild(li3);
  listEl.appendChild(li4);

  //! Verify user's selection, count correct questions
  const correctQCount = 0;

  function verifyQ(e) {
    let currentQ = quizQuestions[currentQIndex];
    let rightChoiceIndex = currentQ.correctAnswer;
    let rightChoiceContent = currentQ.answers[rightChoiceIndex];
    let result = document.createElement("p");
    const questionContainer = document.getElementById("questionContainer");
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
    const score = document.querySelector(".score");

    const completedEl = document.querySelector("completed");
    completedEl.style.display = "block";

    const hideQs = document.querySelector("#questionContainer");
    hideQs.style.display = "none";
    score.textContent = `Final score: ${time}`;

    quizWizzes();
  }

  //! Submit high scores
  function quizWizzes() {
    const submitScore = document.querySelector("#submitBtn");
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
} else {
  // Close window path function

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
    var clearBtn = document.getElementById("clearHighScores");
    var backBtn = document.getElementById("backBtn");

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
    // Close high scores window path function
  }
}
