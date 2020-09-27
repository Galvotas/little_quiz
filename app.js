const answerButtons = document.querySelectorAll('.answer');
const startBtn = document.querySelector('.start-game')
const question = document.querySelector('.question');
const rules = document.querySelector('.rules h6');
const answerContainer = document.querySelector('.answer-choices')
const results = document.querySelector('.results');
const scoreElement = document.querySelector('.score')
const progressBar = document.querySelector('.progressBar')



let currentQuestion = {};
let score = 0;
let qTracker = 0;
let availableQuestions = []
let maxQuestions = []
let questions = [];

    function getData(){
        return fetch(`https://opentdb.com/api.php?amount=15&category=23&difficulty=medium&type=multiple`).then(res => {
        return res.json()
    }).then(data => {
    
     questions = data.results;
     return questions;
    })
}


    
window.addEventListener('DOMContentLoaded', onLoad)


function onLoad() {
    question.innerHTML = rules.innerText;
    answerButtons.forEach(btn => {
        const parent = btn.parentElement;
        parent.style.display = 'none';
    })
    progressBar.parentElement.style.display = 'none'
}

startBtn.addEventListener('click', () => {
    getData().then(startQuiz)
})

function startQuiz() {
    progressBar.parentElement.style.display = 'block'

    score = 0;
    results.style.display = 'none'
    answerButtons.forEach(btn => {
        btn.disabled = false;
        btn.style.display = "block"
    })
    qTracker = 0;
    startBtn.style.display = 'none'
answerContainer.style.display = 'flex'
availableQuestions = [...questions]
maxQuestions = [...questions]
newQuestion()
}


function newQuestion() {
    if(availableQuestions.length === 0) {
answerButtons.forEach(btn => {
    btn.disabled = true;
    btn.style.display = "none"
})
startBtn.innerHTML = `Let's try again!`
startBtn.style.display = 'block';
results.style.display = 'block'
scoreElement.innerHTML = `Your score is: ${score}`

    }
    qTracker++;
    progressBar.style.width = `${(qTracker / (maxQuestions.length + 1)) * 100}%`
        const randomNum = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[randomNum];
        question.innerHTML = currentQuestion.question;
        const answers = currentQuestion.incorrect_answers;
        const filteredAnswers = Array.from(new Set(answers))
        const ranNum = Math.floor(Math.random() * 3) + 1;
        filteredAnswers.splice(ranNum, 0, currentQuestion.correct_answer)
       answerButtons.forEach((btn, index) => {
           btn.innerHTML = filteredAnswers[index]
       })
       availableQuestions.splice(randomNum, 1)
    }
        
    


function checkIfRight() {
answerButtons.forEach(btn => {
    btn.addEventListener('click', e => {
        if(e.target.innerHTML == currentQuestion.correct_answer) {
            score += 10;
            newQuestion();
        } else {
            newQuestion();
        }
        
    })
})
}
checkIfRight()











