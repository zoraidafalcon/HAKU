const playBoard = document.getElementsByClassName("play-board")[0];
const scoreElement = document.getElementsByClassName("score")[0];
const highScoreElement = document.getElementsByClassName("high-score")[0];
const startButton = document.getElementById("startButton")
const endButton = document.getElementById("overButton")
const start = document.getElementById("start")
const wrapper = document.getElementById("wrapper")
const over = document.getElementById("over")
let gameOver = false;
let paperX, paperY;
let hakuX = 5, hakuY = 5;
let velocityX = 0, velocityY = 0;
let hakuBody = [];
let setIntervalId;
let score = 0;

// Se busca la puntuación más alta del almacenamiento local
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `HAKU: ${highScore} papers`;

// Actualizamos la posición de los aviones de papel de forma aleatoria
    const posicionPaper = function (){
        paperX = Math.floor(Math.random() * 15) + 1;
        paperY = Math.floor(Math.random() * 15) + 1;
    };

// Final del juego
const finJuego = () => {
    over.classList.remove('hidden')
    wrapper.setAttribute('class', 'hidden')
    clearInterval(setIntervalId);
    var hakuCrashes = new Audio("./sounds/Haku-crashes.wav");
    hakuCrashes.play();
};

// Cambiar la dirección de la serpiente
var direccion = e => {
    switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "ArrowDown":
        case "s":
        case "S":
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "ArrowRight":
        case "d":
        case "D":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;//inicio
        default:
            break;
    }
};


//Inicio del juego
const iniciarJuego = () => {
    if (gameOver) return finJuego();
    let html = `<div class="paper" style="grid-area:${paperY} / ${paperX}"></div>`;
    // Comprobamos si la serpiente se come la comida.
    if (hakuX === paperX && hakuY === paperY) {
        posicionPaper();
        var eatPaper = new Audio("./sounds/Eat-Paper.mp3");
        setTimeout(function () {
            eatPaper.pause();
        }, 1000);
        eatPaper.play();
        hakuBody.push(hakuBody.length - 1[paperY, paperX]);
        score++; 
    // Guardamos las puntuaciones
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("Paper planes:", highScore);
        scoreElement.innerText = `Paper planes: ${score}`;
        highScoreElement.innerText = `HAKU: ${highScore} papers`;
    }
    // Actualización de la posición de la cabeza
    hakuX += velocityX;
    hakuY += velocityY;
    // Desplazando hacia adelante los valores
    for (let i = hakuBody.length - 1; i > 0; i--) {
        hakuBody[i] = hakuBody[i - 1];
    }
    hakuBody[0] = [hakuX, hakuY]; //Primer elemento del cuerpo de la serpiente en la posición actual de la serpiente
    // Comprobando si la cabeza está fuera de la pared, si es así se configura gameOver en verdadero para finalizar el juego
    if (hakuX <= 0 || hakuX > 15 || hakuY <= 0 || hakuY > 15) {
        return gameOver = true;
    }

    for (let i = 0; i < hakuBody.length; i++) {
        // Se dibuja un div para cada parte del cuerpo de la serpiente.
            html += `<div class="head" style="grid-area: ${hakuBody[0][1]} / ${hakuBody[0][0]}"></div>`;
            if (hakuBody.length > 1 && i === hakuBody.length - 1) {
                html += `<div class="tail" style="grid-area: ${hakuBody[i][1]} / ${hakuBody[i][0]}"></div>`;
            } else if ( i !== 0 && i !== hakuBody.length - 1 && hakuBody.length > 2) {
                html += `<div class="body" style="grid-area: ${hakuBody[i][1]} / ${hakuBody[i][0]}"></div>`;
            }
        // Comprobamos si la cabeza golpeó el cuerpo, establezca gameOver en verdadero
        if (i !== 0 && hakuBody[0][1] === hakuBody[i][1] && hakuBody[0][0] === hakuBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

window.onload = function () {
    startButton.addEventListener("click", inicio)
}

function inicio() {
    //Llamar elemento del dom que controla la pag de inicio
    start.setAttribute('class', 'hidden')
    wrapper.classList.remove('hidden')
    setIntervalId = setInterval(iniciarJuego, 200);
}

endButton.addEventListener('click', () => { location.reload() })
// Llamar a la actualización de la posición de la comida
posicionPaper();
document.addEventListener("keyup", (direccion));

