//create a questionnaire
var myQuestions = [
    {
        question: "what do we use in JavaScript to store booleans, numbers and arrays",
       answears: {
            1: "loops",
            2: "methods",
            3:"functions",
            4:"arrays",

        }, correct: "arrays",
    },

    {
        question:"Commonly used data types DO NOT include:",
        answears: {
            1: "stings",
            2: "booleans",
            3: "alerts",
            4: "numbers"

        }, correct: "alerts",
    },

    {
        question: "The condition in an if/else statement is enclosed within ___________.",
        answears: {
            1: "quotes",
            2: "curly brackets",
            3: "parenthesis",
            4: "square brackets"


        }, correct: "curly brackets",
    },

    {
        question: "String values must be enclosed within______ when being assigned to variables.",
        answears: {
            1: "commas",
            2: "curly brakets",
            3: "quotes",
            4: "parenthesis"


        }, correct: "quotes",
    },

    {
        question: "A very usedful tool used during development and debugging for printing content to the debugger is:",
        answears: {
            1: "JavaScript",
            2: "Terminal/Gitbash",
            3: "for loops",
            4: "console.log"

        }, correct: "console.log",
    },
]
//grab my references to html
var startBtn = document.querySelector("#startBtn");
var questions = document.querySelector("#questions");
var answears = document.querySelector("#answears");
var timer = document.querySelector("#timer");
var finalScore = document.querySelector("#finalScore");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");
var score = document.querySelector("#scores");
var games = [];
var gameLevel = 0

//set time countdown 
var timeLeft = 60;

//add functionality to the start button
startBtn.addEventListener("click", function(){
    countdown();
    renderQuestions(myQuestions[gameLevel]);
});

//create a function that controls the time we have left
function countdown() {
    var timeInterval = setInterval(function(){
        if (timeLeft > -1){
            timer.textContent = timeLeft;
            timeLeft--;
        }else{
            clearInterval(timeInterval);
        }
    },1000);
} 


questions.addEventListener("click", function(event){

console.log(event.target.textContent)
console.log( myQuestions[gameLevel].correct)
 if( event.target.textContent !== myQuestions[gameLevel].correct){
    answears.textContent = "try again";
    timeLeft-=5
}
//need to create a statement that will prevent the player from answear questions once the timer gets to 0


else {
    answears.textContent = "correct! correct!"
    gameLevel++
    renderQuestions(myQuestions[gameLevel])
}
});


//create elements, create content for the element then append (this is what attaches the element creted to the html)
function renderQuestions(activeQuestion) {
    questions.innerHTML = "";

    //create a p tag that will contain an ordered list with the question and the possible answears
    var questionTitle = document.createElement("p")
    var answearLi= document.createElement("ol");
    var answear1 = document.createElement("li");
    var answear2 = document.createElement("li");
    var answear3 = document.createElement("li");
    var answear4 = document.createElement("li");


    //create content for each individual element createn whitin that p tag
    questionTitle.textContent = activeQuestion.question;
   answear1.textContent = activeQuestion.answears[1];
   answear2.textContent = activeQuestion.answears[2];
   answear3.textContent = activeQuestion.answears[3];
   answear4.textContent = activeQuestion.answears[4];
 

   //append the elements so they can be visisble in the page
   questions.append(questionTitle);
   questions.append(answearLi);
  answearLi.append(answear1);
  answearLi.append(answear2);
  answearLi.append(answear3);
  answearLi.append(answear4);
};
  

//save score and initials
submit.addEventListener("click",function(event){
    event.preventDefault();
    var game = {
        initials: initials.value,
        score: timeLeft,
       
   
    };
      games.push(game);
     store();
    renderGames();
}); 


function renderGames(){
    score.innerHTML = ""
    for (var i = 0; i < games.length; i++) {
        console.log(games[i]);
        var highScore = document.createElement("li");
        highScore.textContent = games[i].initials + "" + games[i].score;
        score.append(highScore)
    }
}

function store(){
    console.log(games);
    localStorage.setItem("games", JSON.stringify(games));
}
function retrieveFromStor (){
    var store = JSON.parse(localStorage.getItem("games"));
    if (store !== null){
        games = store
    }
}
retrieveFromStor ()