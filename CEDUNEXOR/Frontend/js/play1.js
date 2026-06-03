let time = 20;
let currentQuestion = 1;
let correctAnswer = "";
let timer;
let usuario = obtenerUsuarioActual();

const timeElement = document.getElementById("time");
const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const questionNumber = document.getElementById("questionNumber");
const timerBar = document.getElementById("timerBar");


startGame();

answerInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

function startGame() {
    generateQuestion();

    timer = setInterval(() => {
        time--;
        updateTimer();

        if (time <= 0) {
            loseGame();
        }

    }, 1000);
}

function updateTimer() {
    timeElement.textContent = time;

    let percentage = (time / 20) * 100;
    if (percentage > 100) percentage = 100;

    timerBar.style.width = percentage + "%";
}

function randomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

function generateQuestion() {

    questionNumber.textContent = currentQuestion;

    let difficulty = currentQuestion * 20;
    if (difficulty > 100) difficulty = 100;

    const type = Math.floor(Math.random() * 2);

    if (type === 0) {
        generateNormalQuestion(difficulty);
    } else {
        generateMissingOperatorQuestion(difficulty);
    }
}

function generateNormalQuestion(max) {

    const operators = ["+", "-", "*"];

    const a = randomNumber(max);
    const b = randomNumber(max);
    const c = randomNumber(max);

    const op1 = operators[Math.floor(Math.random() * operators.length)];
    const op2 = operators[Math.floor(Math.random() * operators.length)];

    const expression = `${a} ${op1} ${b} ${op2} ${c}`;

    correctAnswer = eval(expression);

    questionElement.textContent = expression + " = ?";
}

function generateMissingOperatorQuestion(max) {

    const operators = ["+", "-", "*"];

    const a = randomNumber(max);
    const b = randomNumber(max);
    const c = randomNumber(max);

    const hiddenOperator = operators[Math.floor(Math.random() * operators.length)];
    const fixedOperator = operators[Math.floor(Math.random() * operators.length)];

    const result = eval(`${a} ${hiddenOperator} ${b} ${fixedOperator} ${c}`);

    correctAnswer = hiddenOperator;

    questionElement.textContent =
        `${a} ? ${b} ${fixedOperator} ${c} = ${result}`;
}

function checkAnswer() {

    let answer = answerInput.value.trim();
    
    if (!answer) return;

    actualizarMisiones("partidas"); 
    
    if (answer.toString() === correctAnswer.toString()) {

        time += 3;
        currentQuestion++;
        actualizarMisiones("completar");
        actualizarMisiones("ganar");

        if (currentQuestion > 10) {
            winGame();
            return;
        }

        answerInput.value = "";
        generateQuestion();
        updateTimer();

    } else {

        time -= 5;

        if (time <= 0) {
            loseGame();
            return;
        }

        answerInput.value = "";
        updateTimer();
    }
    actualizarUsuario(usuario);
}


function winGame() {

    clearInterval(timer);

    let usuario = obtenerUsuarioActual();

    if (!usuario) return;

    usuario.puntos += 50;
    usuario.juegosJugados++;

    usuario.nivel = Math.floor(usuario.puntos / 100) + 1;

    actualizarUsuario(usuario);

    document.querySelector(".game-container").innerHTML = `
        <h1>🎉 Ganaste</h1>
        <h2>Total de puntos ganados: 50</h2>
        <p>Ahora tienes ${usuario.puntos} puntos acumulados.</p>

        <a href="play.html">
            <button class="home-btn">Volver al inicio</button>
        </a>
    `;
}


function loseGame() {

    clearInterval(timer);

    let usuario = obtenerUsuarioActual();

    if (!usuario) return;

    usuario.juegosJugados++;

    actualizarUsuario(usuario);

    document.querySelector(".game-container").innerHTML = `
        <h1>⏰ Fallaste</h1>
        <h2>Total de puntos ganados: 0</h2>

        <a href="play.html">
            <button class="home-btn">Volver al inicio</button>
        </a>
    `;
}

function actualizarMisiones(tipo) {
    usuario.misiones.forEach(mision => {
        if (mision.tipoMision === tipo) {
            if(mision.progreso < mision.valorRequerimiento){
                mision.progreso++;    
            }else if(mision.progreso >= mision.valorRequerimiento){
                mision.fechaCompletada = new Date().toLocaleString();
                completarMision();
            }
        }
    });
}

