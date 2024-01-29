var tableGame = document.querySelector(".table-game");

var foodX, foodY;
var hakuX = 10
var hakuY = 2
var speedY = 0
var speedX = 0


var changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
};

var changeDirection = (i) => {
    if (i.key === "ArrowUp" || i.key === "W") {
        speedY = -1;
        speedX = 0;
    } else if (i.key === "ArrowDown" || i.key === "S") {
        speedY = 1;
        speedX = 0;
    } else if (i.key === "ArrowLeft" || i.key === "A") {
        speedY = 0;
        speedX = -1;
    } else if (i.key === "ArrowRight" || i.key === "D") {
        speedY = 0;
        speedX = 1;
    }
    startGame();
};

var startGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area:${foodX} / ${foodY}"></div>`;
    hakuX += speedY;
    hakuY += speedX;
    htmlMarkup += `<div class="haku" style="grid-area:${hakuX} / ${hakuY}"></div>`;
    tableGame.innerHTML = htmlMarkup;
};

changeFoodPosition();
startGame();
document.addEventListener("keydown", changeDirection);
