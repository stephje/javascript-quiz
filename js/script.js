//get the different cards by element and store in variables 
const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-card");
const scoreCard = document.querySelector("#score-card");
const leaderboardCard = document.querySelector("#leaderboard-card")

//hide all cards
function hideCards (){
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
}

//hide result text as required
function hideResultText() {
    resultDiv.style.display = "none";
}

//store question text, options and answers in an array
const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        questionText: "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"], 
        answer: "3. quotes"
    },
    {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    }
]

//Timer start value
var time = 40;

//display available time in header of page as required
var timeDisplay = document.querySelector("#time")

function displayTime() {
    timeDisplay.textContent = time;
}

//inervalID will be defined when start button is clicked
var intervalID = undefined;

//reduce time by 1 and display new value
//if time runs out then end quiz
function countdown() {
    time --;
    displayTime();
    if (time < 1) {
        endQuiz();
    }
}

//When "start" button is clicked:
//hide the start card, 
//reveal the question card,
//invoke function to display first question, 
//display available time
document.querySelector("#start-button").addEventListener("click", startQuiz);

function startQuiz() {
    hideCards();
    questionCard.removeAttribute("hidden");
    displayQuestion();
    intervalID = setInterval(countdown, 1000)
    displayTime();
}

//display the question and answer options for the current question
var currentQuestion = 0

function displayQuestion() {
    var question = questions[currentQuestion];
    var h2QuestionElement = document.querySelector("#question-text");
    h2QuestionElement.textContent = question.questionText;
    
    var options = question.options

    for (let i = 0; i < options.length; i++) {
        var option = options[i];
        var optionButton = document.querySelector("#option" + i);
        optionButton.textContent = option;
    }
}

//define behaviour when answer is clicked
//click event bubbles up to div with id "quiz-options"
//eventObject.target identifies the specific button element that was clicked on
document.querySelector("#quiz-options").addEventListener("click", checkAnswer);

var resultDiv = document.querySelector("#result-div");
var resultText = document.querySelector("#result-text");

//Compare the text content of the option button with the answer to the current question
function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
}

//if answer is incorrect, penalise time
function checkAnswer(eventObject) {
    var optionButton = eventObject.target;
    resultDiv.style.display = "block";
    if(optionIsCorrect(optionButton)) {
        resultText.textContent = "Correct! :D";
        setTimeout(hideResultText, 1000)
    } else {
        resultText.textContent = "WRONG! :(";
        setTimeout(hideResultText, 1000)
        if (time >= 10) {
            time = time - 10;
            displayTime();
        } else {
            time = 0;
            displayTime();
            endQuiz();
        }
    }
    //increment current question by 1
    currentQuestion++;
    //if we have not run out of questions then display next question, else end quiz
    if (currentQuestion < questions.length){
        displayQuestion();
    } else {
        endQuiz();
    }
}

//display scorecard and hide other divs
var score = document.querySelector("#score")

function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
}

//get user initials
var submitButton = document.querySelector("#submit-button");
var inputElement = document.querySelector("#initials");
var leaderboardArray = [];

submitButton.addEventListener("click", storeScore);

function storeScore(event){
    //prevent default behaviour of form submission
    event.preventDefault();

    //store score and initials in an object
    var leaderboardItem = {
    initials: inputElement.value,
    score: time
    }

    //check if there is already a key "leaderboardArray" in local storage
    var storedLeaderboard = localStorage.getItem("leaderboardArray");
    if (storedLeaderboard !== null) {
        leaderboardArray = JSON.parse(storedLeaderboard);
    }

    //append new leaderboard item to leaderboard array
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboardArray));

    //hide the question card, display the leaderboardcard
    hideCards();
    leaderboardCard.removeAttribute("hidden");
}


//Clear Scoreboard
//Go back button loops to start
