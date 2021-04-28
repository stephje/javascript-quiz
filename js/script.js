//select the different card divs by id and assign to variables 
const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-card");
const scoreCard = document.querySelector("#score-card");
const leaderboardCard = document.querySelector("#leaderboard-card");

//hide all cards
function hideCards (){
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
}

//select the div and paragraph elements used to display "correct"/"incorrect"
var resultDiv = document.querySelector("#result-div");
var resultText = document.querySelector("#result-text");

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
    },
    {
        questionText: "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break"
    }
]

//intervalID assigned a value when start button is clicked
var intervalID = undefined;

//select span with id "time" - it is inside the time element
var timeDisplay = document.querySelector("#time");

//display time
function displayTime() {
    timeDisplay.textContent = time;
}

//reduce time by 1 and display new value
//if time runs out then end quiz
function countdown() {
    time --;
    displayTime();
    if (time < 1) {
        endQuiz();
    }
}

//use link to view highscores
const leaderboardLink = document.querySelector("#leaderboard-link");
leaderboardLink.addEventListener("click", showLeaderboard);

function showLeaderboard(){
    hideCards();
    leaderboardCard.removeAttribute("hidden");
    clearInterval(intervalID);
    time = undefined;
    displayTime();
}

//When "start" button is clicked:
//hide the start card, 
//reveal the question card,
//invoke function to display first question, 
//display available time
document.querySelector("#start-button").addEventListener("click", startQuiz);
var currentQuestion = 0;

function startQuiz() {
    hideCards();
    questionCard.removeAttribute("hidden");
    currentQuestion = 0;
    time = 100;
    displayQuestion();
    intervalID = setInterval(countdown, 1000);
    displayTime();
}

//display the question and answer options for the current question
function displayQuestion() {
    var question = questions[currentQuestion];
    var h2QuestionElement = document.querySelector("#question-text");
    h2QuestionElement.textContent = question.questionText;
    
    var options = question.options;

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



//Compare the text content of the option button with the answer to the current question
function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
}

//if answer is incorrect, penalise time
function checkAnswer(eventObject) {
    console.log(eventObject);
    var optionButton = eventObject.target;
    resultDiv.style.display = "block";
    if(optionIsCorrect(optionButton)) {
        resultText.textContent = "Correct!";
        setTimeout(hideResultText, 1000);
    } else {
        resultText.textContent = "Incorrect!";
        setTimeout(hideResultText, 1000);
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
var score = document.querySelector("#score");

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

    //check for input
    if (!inputElement.value) {
        alert('Please enter your initials before pressing submit!');
        return;
      }

    //store score and initials in an object
    var leaderboardItem = {
    initials: inputElement.value,
    score: time
    }

    updateLeaderboard();

    //append new leaderboard item to leaderboard array
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));

    //hide the question card, display the leaderboardcard
    hideCards();
    leaderboardCard.removeAttribute("hidden");

    sortLeaderboard();
    renderLeaderboard();
}

//get "leaderboardArray" from local storage (if it exists) and parse it into a javascript object using JSON.parse
function updateLeaderboard() {
    var storedLeaderboard = localStorage.getItem("leaderboardArray");
    if (storedLeaderboard !== null) {
        leaderboardArray = JSON.parse(storedLeaderboard);
    }
}

function sortLeaderboard() {
    updateLeaderboard();
    if (!leaderboardArray) {
        return;
    }

    //sort array highest to lowest
    leaderboardArray.sort(function(a, b) {
        return b.score - a.score;
    });
}

function renderLeaderboard(){
    var highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < leaderboardArray.length; i++) {
        var leaderboardEntry = leaderboardArray[i];
        var newListItem = document.createElement("li");
        newListItem.textContent = (leaderboardEntry.initials + " - " + leaderboardEntry.score);
        highscoreList.append(newListItem); 
    }
}

const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearHighscores);

function clearHighscores() {
    localStorage.clear();
    leaderboardArray = [];
    renderLeaderboard();
}

const backButton = document.querySelector("#back-button");
backButton.addEventListener("click", returnToStart);

//Hide leaderboard card show start card
function returnToStart() {
    hideCards();
    startCard.removeAttribute("hidden");
}
