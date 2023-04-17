//timer section
//select element by class
var timeEl = document.querySelector(".timer");
//timer starts as soon as page loads
var secondsLeft = 50;
var deduction = 0;
var score = 0;
var users = [];
var timerInterval = setInterval(function () {
  if (deduction > 0) {
    secondsLeft = secondsLeft - deduction;
    if (secondsLeft < 0) {
      showScores()
    }
  }
  secondsLeft--;
  if (quiz.isEnded()) {
    timeEl.textContent = "TIME:" + 0;
  } else {
    timeEl.textContent = "TIME:" + secondsLeft;
  }
  deduction = 0;
  if (secondsLeft === 0) {
    clearInterval(timerInterval);
  }
}, 1000);
//quiz section if answer wrong minus 10 seconds 

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }
  getQuestionIndex = function () {
    return this.questions[this.questionIndex];
  }
  guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    } else {
      deduction = 10;
    }

    this.questionIndex++;

  }
  isEnded = function () {
    return this.questionIndex === this.questions.length;
  }
}

class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer = function (choice) {
    return this.answer === choice;
  }
}

function populate() {
  if (quiz.isEnded()) {
    showScores();
  }
  else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }

};


function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  }
};


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;

};
//display scores 
function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  var form = document.getElementById("initialForm");
  gameOverHTML += form.getInnerHTML();
  element.innerHTML = gameOverHTML;
  document.getElementById("initial-form").style.visibility = "visible";
};
//display initials and stores initials
function displayInitial() {
  var initialHtml = "<h1>Scorecard</h1>";
  var input = document.getElementById("initial-form");
  initial = input.elements["initials"].value;
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var user = {
    name: initial,
    score: quiz.score
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  for (var name of users) {
    initialHtml += "<h2 id='score'>" + name.name + " = " + name.score + "</h2>";
  }
  var element = document.getElementById("quiz");
  element.innerHTML = initialHtml;
}


//question and answer

var questions = [

  new Question("Javascript is an _______ language?", ["Object-oriented", "Object-Based", "Procedural", "None of the above"], "Object-oriented"),

  new Question("Which of the following keywords is used to define a variable in Javascript?", ["Var", "let", "Both 1 and 2", "None of the above"], "Both 1 and 2"),

  new Question("Which of the following methods is used to access HTML elements using Javascript?", ["getElementbyId()", "getElementByClassName()", "Both 1 and 2", "None of the above"], "Both 1 and 2"),

  new Question("When an operators value is NULL, the typeof returned by the unary operator is:", ["Boolean", "Undefined", "Integer", "Object"], "Object"),



  new Question("Which function is used to serialize an object into a JSON string in Javascript?", ["stringify()", "parse()", "convert()", "None of the above"], "stringify"),

];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
