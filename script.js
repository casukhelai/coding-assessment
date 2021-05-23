// From Start Page: create eventListener to start game
// Create element to get questionContainer (#quest-container)
// Create element for actual questions (#question)
// Create element for answer buttons (#answerBtn)
let startButton = document.querySelector("#start-btn");
let headerRemove = document.querySelector("#header");
let paragraphRemove = document.querySelector("#paragraph");
let questionContainer = document.querySelector("#questContain");
let questionDiv = document.querySelector("#question");
let answerButtons = document.querySelector("#answerBtn");
let highScore = document.querySelector("#end");
let goBack = document.querySelector("#back-btn");
let clearScores = document.querySelector("#clearAll");
let timer = document.querySelector("#timer");

// need to store score here
let initials = document.querySelector("#initials");
let recentScore = localStorage.getItem('recentScore');
let submitBtn = document.querySelector("#submit-btn");
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];



// create a randomize variable for shuffling answers/questions
// and initialize current question index
let shuffleQuest, currentQuestionIndex;

// add event listener to initiate gamePlay function

startButton.addEventListener('click', gamePlay);

let startTime = 60;
// create functions first

//check example of clear timer


function gamePlay() {
    function myTimer() {

        if (startTime <= 0) {
            clearInterval(timer);
            let score = 0;
            highScore.classList.remove('hide');
            goBack.classList.remove('hide');
            clearScores.classList.remove('hide');
            questionContainer.classList.add('hide');

            saveScore();
            // not taking away the text
            // timer.classList.add('hide');

          } else {
            startTime = startTime-1;
            document.querySelector("#timer").innerHTML = startTime;
            //stop the timer
            // clearInterval(timer);
            // store as score = startTimer
          }
     
          
    }
    let timer = setInterval(myTimer, 1000);
    // console.log(timer);
    

    // let store score = timer
    // let score = timer;
    

    // hides start button, header, and paragraph once start is clicked
    startButton.classList.add('hide');
    headerRemove.classList.add('hide');
    paragraphRemove.classList.add('hide');

    // grab question container, but remove hide class
    questionContainer.classList.remove('hide');

    // want to randomize questions so this will shuffle them
    // subtract by .5 to give us a random array. Value either less or greater than 0
    shuffleQuest = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;

    // sets next question
    nextQuestion();
    // console.log("game started");
}

function nextQuestion() {
    showQuest(shuffleQuest[currentQuestionIndex]);
    currentQuestionIndex++;
    
}

function showQuest(question) {
    questionDiv.innerHTML = ''; 
    answerButtons.innerHTML = ''; // this empties out previous answer btns

    if(currentQuestionIndex >= questions.length){
        // once questions are done, then we need to STORE the remaining time as the SCORE
        //localStorage.getItem('recentScore');
        highScore.classList.remove('hide');
        goBack.classList.remove('hide');
        clearScores.classList.remove('hide');
        questionContainer.classList.add('hide');
        clearInterval(timer);
        let finalTime = timer;
        // console.log actually logged the time...need to pull this
        saveScore(finalTime);
        
    } else {
        questionDiv.innerText = question.question;

        // create answer buttons
        question.answers.forEach(answer => {
            let button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.setAttribute("isCorrect", answer.correct);
            if(answer.correct){
                
                button.dataset.correct = answer.correct; 
            }
            button.addEventListener('click', answerSelect);
            answerButtons.appendChild(button);
        })
    }
}

// need to check if selected answer is correct
function answerSelect(event) {
    let ansSelected = event.target.getAttribute("isCorrect");
    console.log(ansSelected)

    if (ansSelected != "true"){
        alert("Wrong!");
        startTime = startTime - 10;
    }
   
    // goes to the next question
    nextQuestion();
}


function saveScore(recentScore) {
    // call the remaining time AFTER it is stopped and allocate to score
    console.log(recentScore);
    // this is assigning the appropriate number, but cannot properly allocate to storage
    finalTime = recentScore;
    let score = {
        score: finalTime,
    };
    console.log(score);
    //push highscore into array
    highScores.push(score);
    
    highScores.splice(10);
    console.log("score");
    // sets to local storage so when user refreshes, the array stays
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
};

let questions = [
    {
        question: "Which of the following is NOT a JavaScript Data Type?",
        answers: [
            { text: 'Functions', correct: true },
            { text: 'String', correct: false },
            { text: 'Boolean', correct: false },
            { text: 'Number', correct: false },
        ]   
    },
    {
        question: "What is a global variable?",
        answers: [
            { text: 'Variables available throughout the world', correct: false },
            { text: 'Variables available throughout the whole code', correct: true },
            { text: 'Variables with a scope', correct: false },
            { text: 'None of the above', correct: false },
        ]   
    },
    {
        question: "Which of the following HTML tags do not have end tags?",
        answers: [
            { text: '<h1>', correct: false },
            { text: '<p>', correct: false},
            { text: '<div>', correct: false },
            { text: '<img>', correct: true },
        ]   
    },
    {
        question: "Properties of the box model: ",
        answers: [
            { text: 'Element, Box and Whisker Plot', correct: false },
            { text: 'Element, Border, Paddington Bear, Margin', correct: false },
            { text: 'Element, Border, Padding, Margin', correct: true },
            { text: 'None of the above', correct: false },
        ]   
    },
    {
        question: "What are psuedo classes?",
        answers: [
            {text: "Elements that operate under certain conditions", correct: true},
            {text: "Fake classes", correct: false},
            {text: "Semi Classes", correct: false},
            {text: "Real Classes", correct: false},
        ]
    }
];
