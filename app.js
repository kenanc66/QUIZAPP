function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
var q1 = new Question("How old I am ?", ["20", "22", "24", "25"], "25");

var q2 = new Question("Where am I from?", ["Ankara", "Kırıkkale", "Yozgat", "Sivas"], "Yozgat");

var q3 = new Question("Where Did I live the most ?", ["Ankara", "Kırıkkale", "Yozgat", "Sivas"], "Ankara");

var q4 = new Question("Which country I travelled?", ["Austria", "Australia", "Poland", "None"], "None");

var q5 = new Question("How long does it take to code this quiz app?", ["30 minutes", "60 minutes", "120 minutes", "180 minutes"], "60 minutes");

var questions = [q1, q2, q3, q4, q5];

// Question prototype
Question.prototype.checkAnswer = function (answer) {
    return this.answer === answer;
}

// Quiz Constructor
function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0
}

// Quiz Prototype
Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex];
}

// Quiz isFinish
Quiz.prototype.isFinish = function () {
    return this.questions.length === this.questionIndex;
}

// Quiz guess
Quiz.prototype.guess = function (answer) {
    var question = this.getQuestion();

    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

// Start Quiz

var quiz = new Quiz(questions);

loadQuestion();


function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
    } else {

        var question = quiz.getQuestion();
        var choices = question.choices;

        document.querySelector('#question').textContent = question.text;

        for (var i = 0; i < choices.length; i++) {
            var element = document.querySelector('#choice' + i);
            element.innerHTML = choices[i];
            guess('btn' + i, choices[i]);
        }

        showProgress();
    }
}

function guess(id, guess) {
    var btn = document.getElementById(id);
    btn.onclick = function () {
        quiz.guess(guess);
        loadQuestion()
    }
}

function showScore() {
    var html = `<h2>Score</h2><h3>${quiz.score} out of 5</h3> `;
    var html2 = `<h2>Answers <br>1: ${q1.answer} <br>2: ${q2.answer}<br>3: ${q3.answer}<br>4: ${q4.answer}<br>5: ${q5.answer}</h2>`
    document.querySelector('.notification').innerHTML = html;
    document.querySelector('#progress').innerHTML = html2;
}

function showProgress() {
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex + 1;
    var html = 'Question ' + questionNumber + ' of ' + totalQuestion;

    if (totalQuestion === questionNumber) {
        document.querySelector('#progress').innerHTML = "Last question";
    } else {
        document.querySelector('#progress').innerHTML = html;
    }


}