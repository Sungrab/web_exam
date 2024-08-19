import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import Question from "./utils/questions";
var score = 0;
homePage();
function homePage() {
  renderQuestions();
}
function renderQuestions() {
  var main = document.getElementById('main');
  var listQuestion = Question;
  listQuestion.forEach(question => {
    var questionDisplay = createQuestion(question);
    main.appendChild(questionDisplay);
  });
}
function createQuestion(question) {
  var questionElement = document.createElement('div');
  questionElement.id = question.id;
  questionElement.innerHTML = "\n        <div class='container'>\n            <div class=''>\n                <h5>".concat(question.question, "</h5>\n            </div>\n            <div class='row' id='answerlist'></div>\n            <button class=\"btn btn-primary mt-3\" id=\"mybtn\">Submit Answer</button>\n        </div>");
  var listAnswer = questionElement.querySelector("#answerlist");
  question.answers.forEach((answer, index) => {
    var answerElement = createAnswer(answer, index, question.id);
    listAnswer.appendChild(answerElement);
  });
  var checkBtn = questionElement.querySelector("#mybtn");
  checkBtn.addEventListener('click', () => {
    checkAnswer(question.id);
  });
  initializeSingleChoice(questionElement);
  return questionElement;
}
function createAnswer(answer, index, questionId) {
  var answerElement = document.createElement('div');
  answerElement.className = 'form-check';
  answerElement.result = "".concat(answer.isCorrect);
  answerElement.innerHTML = "\n        <input class=\"form-check-input\" type=\"radio\" name=\"answer-".concat(questionId, "\" value=\"").concat(answer.text, "\" id=\"flexCheck-").concat(questionId, "-").concat(index, "\">\n        <label class=\"form-check-label\" for=\"flexCheck-").concat(questionId, "-").concat(index, "\">\n            ").concat(answer.text, "\n        </label>");
  return answerElement;
}
function initializeSingleChoice(questionElement) {
  var checkboxes = questionElement.querySelectorAll('.form-check-input');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      if (this.checked) {
        checkboxes.forEach(otherCheckbox => {
          if (otherCheckbox !== this) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });
}
function checkAnswer(questionId) {
  var selectedAnswer = document.querySelector("input[name=\"answer-".concat(questionId, "\"]:checked"));
  if (selectedAnswer) {
    var userAnswer = selectedAnswer.value;
    var currentQuestion = Question.find(question => question.id === questionId);
    var correctAnswer = currentQuestion.answers.find(answer => answer.isCorrect);
    if (userAnswer === correctAnswer.text) {
      score += 1;
    }
  }
}