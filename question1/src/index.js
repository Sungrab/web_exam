import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import Question from './utils/questions'

homepage();


function homepage () {
    console.log("homepage est lance");
    rendreQuestions();
}

function rendreQuestions(){
    const main = document.querySelector('main');
    main.innerHTML = `" "`
    const listQuestion = select3Question();

    for (let i = 0; i < listQuestion.length; i+=1) {
        const questionDisplay = creatQuestion(listQuestion[i]);
        main.appendChild(questionDisplay);
    }

    const btn = document.createElement('div');
    btn.innerHTML = `<button class="btn btn-primary mt-3" id="mybtn">Submit Answer</button> `
    main.appendChild(btn);

    const checkBtn = document.querySelector('#mybtn');
    if (checkBtn) { 
        checkBtn.addEventListener('click', () => {
        
            const score = checkScore(listQuestion);
            main.innerHTML = `
                <h1>Your score is ${score}/3</h1>
                <button class="btn btn-primary mt-3" id="replayBtn">Replay</button>
            `;
            const replayBtn = document.querySelector('#replayBtn');
            if (replayBtn) {
                replayBtn.addEventListener('click', homepage);
            }
        });
    } else {
        console.error("L'élément #mybtn n'a pas été trouvé dans le DOM.");
    }
    

    

    
}


function creatQuestion (question) {
    const questionElement = document.createElement('div');
    questionElement.id = `question-${question.id}`;
    questionElement.innerHTML = `
        <div class='container'>
            <div class=''>
                <h5>${question.question}</h5>
            </div>
            <div class='row' id='answerlist'></div>      
        </div>`;
    const list = questionElement.querySelector('#answerlist');
    list.appendChild(creatAnswers(question));

    return questionElement;
}


function creatAnswers (question) {
    const answersList = document.createElement('ul');
    question.answers.forEach((answerObj, index) => {
        const answer = document.createElement('li');
        const checkButton = document.createElement('input');
        checkButton.type = 'radio';
        checkButton.name = `question${question.id}`;
        checkButton.value = index;

        checkButton.dataset.correct = answerObj.isCorrect;

        const answerText = document.createTextNode(answerObj.text);
        answer.appendChild(answerText);
        answer.appendChild(checkButton);
        answersList.appendChild(answer);
        
    })
    return answersList;
}

function checkOneAnswer (question){
    const selectedAnswer = document.querySelector(`#question-${question.id} input[type="radio"]:checked`);
    if (!selectedAnswer) return false;
    return selectedAnswer.dataset.correct === 'true';
}


function checkScore(listQuestion) {
    let score = 0;
    listQuestion.forEach(element => {
        const isCorrect = checkOneAnswer(element);
        if (isCorrect) {
            score += 1;
        }
    });
    return score;
}


function select3Question() {
    const listid = [];
    const listQuestion = [];
    const questions = Question;
    if (questions.length < 3) {
        throw new Error("Not enough questions to select 3 unique ones.");
    }
    while (listid.length < 3) {
        const id = Math.floor(Math.random() * questions.length);
        if (!listid.includes(id)) {
            listid.push(id);
            listQuestion.push(questions[id]);
        }
    }
    return listQuestion;
}