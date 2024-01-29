var tableGame = document.querySelector(".table-game");

var foodX, foodY;
// var hakuX = 10
// var hakuY = 2
var speedY = 0
var speedX = 0

var myHaku= [{hakuX:10, hakuY:2},{hakuX:11,hakuY:2}
]

var changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
};

var changeDirection = (i) => {
    console.log(i.key)
    if (i.key === "ArrowUp" || i.key === "w" || i.key === "W") {
        speedY = -1;
        speedX = 0;
    } else if (i.key === "ArrowDown" || i.key === "s" || i.key === "S") {
        speedY = 1;
        speedX = 0;
    } else if (i.key === "ArrowLeft" || i.key === "a" || i.key === "A") {
        speedY = 0;
        speedX = -1;
    } else if (i.key === "ArrowRight" || i.key === "d" || i.key === "D") {
        speedY = 0;
        speedX = 1;
    }
    startGame();
};

var startGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area:${foodX} / ${foodY}"></div>`;
    myHaku.forEach(function(part){
        part.hakuX += speedY;
        part.hakuY += speedX;
        htmlMarkup += `<div class="haku" style="grid-area:${part.hakuX} / ${part.hakuY}"></div>`;
    })
    tableGame.innerHTML = htmlMarkup;
};

changeFoodPosition();
startGame();
document.addEventListener("keydown", changeDirection);
