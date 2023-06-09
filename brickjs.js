// const canvas = document.getElementById('visual');
// const ctx = canvas.getContext('2d');
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 780
const boardHeight = 400
let timerId
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [380, 10];
let currentPosition = userStart;

const ballStart = [400, 30]
let ballCurrentPosition = ballStart



// create a Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRigth = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(560, 270),
    new Block(670, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(560, 240),
    new Block(670, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
    new Block(560, 210),
    new Block(670, 210),
    new Block(10, 300),
    new Block(120, 300),
    new Block(230, 300),
    new Block(340, 300),
    new Block(450, 300),
    new Block(560, 300),
    new Block(670, 300),
    new Block(10, 330),
    new Block(120, 330),
    new Block(230, 330),
    new Block(340, 330),
    new Block(450, 330),
    new Block(560, 330),
    new Block(670, 330),
    new Block(10, 360),
    new Block(120, 360),
    new Block(230, 360),
    new Block(340, 360),
    new Block(450, 360),
    new Block(560, 360),
    new Block(670, 360),





]

//draw my block
function addBlocks() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block')

        block.style.left = blocks[i].bottomLeft[0] + "px"
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks();

//add user
const user = document.createElement('div')
user.classList.add('user');
drawUser()

grid.appendChild(user);

//draw user function

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}
/// draw the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}


//move user 

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 30
                drawUser()
            }


            break;

        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 30
                drawUser()

            }
            break;


    }
}
document.addEventListener('keydown', moveUser)

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()

grid.appendChild(ball)

// move ball

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 18)
// check for colission
function checkForCollisions() {
    // check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[1].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
            // check for win

            if (blocks.length === 0) {
                scoreDisplay.innerHTML = "Cant belive, a human won LOL"
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }



        }
    }


    // check for user collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)

    ) {
        changeDirection()
    }




    //check for wall collisions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
    ) {

        changeDirection()
    }





    // check for fame over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = "you lose"
        document.removeEventListener('keydown', moveUser)
    }

}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    else if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    else if (xDirection === -2 && yDirection == -2) {
        yDirection = 2
        return
    }
    else if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }

}
