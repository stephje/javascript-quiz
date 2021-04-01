document.getElementById("start-card").hidden = false;
document.getElementById("question-card").hidden = true;
document.getElementById("result").hidden = true;
document.getElementById("score-card").hidden = true;
document.getElementById("highscore-card").hidden = true;

document.getElementById("start-button").addEventListener("click", startQuiz);

function startQuiz() {
    document.getElementById("start-card").hidden = true;
    document.getElementById("question-card").hidden = false;
}

const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    }
    {
        question: "Arrays in JavaScript can be used to store ______.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    }
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"], 
        answer: "quotes"
    }
    {
        question: "A very useful tool used during development and debugging for printing content to the debucgger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    }
]



