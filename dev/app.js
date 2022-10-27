//! Setup
var body = document.body;
var quizQuestions = [
    {
      question: "Commonly used data types DO NOT include",
      answers: ["Strings", "Booleans", "Alerts", "Numbers"],
      correctAns: 2
  },
  {
      question: "The condition in an if/else statement is enclosed within _____.",
      answers: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
      correctAns: 2
  },
  {
      question: "Arrays in JavaScript can be used to store:",
      answers: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
      correctAns: 3
  },
  {
      question: "String values must be enclosed within ____ when being assigned to variables.",
      answers: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
      correctAns: 2
  },
  {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      answers: ["JavaScript", "Terminal/bash", "For loops", "console.log"],
      correctAns: 3
  }
];

//! Local storage 
if (!localStorage.getItem("highScores")) {
  localStorage.setItem("highScores", JSON.stringify([]));
}

//! Timer
function startTimer(){
  var counter = 60;
  setInterval(function() {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("count");
      span.innerHTML = counter;
    }
    if (counter === 0) {
        alert('sorry, out of time');
        clearInterval(counter);
    }
  }, 1000);
}
function start()
{
    document.getElementById("count").style="color:green;";
    startTimer();
};

//! Start button
const startButton = document.getElementById(".start-q");
startButton.addEventListener("click", startQuiz);

function startQuiz () {
  const startMessage = document.getElementById(".start");
  startMessage.style.display = "none";
  time = setInterval(startTimer);
}

function displayQ() {
  if(currentQIndex >= 4) {
    return quizComplete();
  }
  currentQIndex++;
  console.log('currentQIndex', currentQIndex);

  // Define currentQIndex here
}