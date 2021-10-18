let game = document.querySelector("#game");
let dino = document.querySelector("#dino");
let obstacle = document.querySelector("#obstacle");
let ground = document.querySelector("#ground");
let cloud = document.querySelector("#cloud");
let cloud2 = document.querySelector("#cloud2");
let score = document.querySelector("#score");
let gameOver = document.querySelector("#gameOver");
let restart = document.querySelector("#restart");
var jump = document.getElementById("jump");
var die = document.getElementById("die")

const obstacleArray = ["./assets/images/obstacle1.png",
    "./assets/images/obstacle2.png",
    "./assets/images/obstacle3.png",
    "./assets/images/obstacle4.png",
    "./assets/images/obstacle5.png",
    "./assets/images/obstacle6.png",
]

//score
let interval = null;
let startInterval = null;
var playerScore = 0;

let scoreCounter = () => {
    playerScore++;
    score.innerHTML = `<b>${playerScore}</b>`;
}

//start game


window.addEventListener("keydown", (start) => {
    if (start.code == "Space") {

        gameOver.style.display = "none";
        restart.style.display = "none";
        obstacle.classList.add("obstacleActive");
        cloud.classList.add("cloudActive");
        cloud2.classList.add("cloudActive");
        ground.classList.add("groundActive");

        //score
        var playerScore = 0;
        interval = setInterval(scoreCounter, 200);

        //custom obstacle
        if (obstacle.classList == "obstacleActive") {
            let nextObstacle = function () {
                let randomNum = Math.floor(Math.random() * obstacleArray.length);
                let custom = obstacleArray[randomNum];
                document.getElementById("obstacleImg").src = custom;
                console.log(custom);
            }
            startInterval = setInterval(nextObstacle, 2000);
        }

    }
});


//jump dino
window.addEventListener("keydown", (e) => {

    if (e.key == "ArrowUp") {
        if (dino.classList != "dinoActive") {
            dino.classList.add("dinoActive");
            jump.play();

            //remove after 0.5 second
            setTimeout(() => {
                dino.classList.remove("dinoActive")
            }, 800);
        }
    }
});


//gameOver

let result = setInterval(() => {


    let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));
    // console.log("dinoBottom" + dinoBottom);

    let obstacleLeft = parseInt(getComputedStyle(obstacle).getPropertyValue("left"));
    // console.log("obstacleLeft" + obstacleLeft);

    if (dinoBottom <= 70 && obstacleLeft >= 50 && obstacleLeft <= 150) {
        // console.log("Game Over");

        die.play();
        gameOver.style.display = "block";
        restart.style.display = "block";
        obstacle.classList.remove("obstacleActive");
        cloud.classList.remove("cloudActive");
        cloud2.classList.remove("cloudActive");
        ground.classList.remove("groundActive");
        clearInterval(interval);
        clearInterval(startInterval);
        playerScore = 0;

    }

}, 10);
