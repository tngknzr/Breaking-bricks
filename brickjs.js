// const canvas = document.getElementById('visual');
// const ctx = canvas.getContext('2d');
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 900
const boardHeight = 500
let timerId
let xDirection = -2
let yDirection = 2

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
    new Block(780, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(560, 240),
    new Block(670, 240),
    new Block(780, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
    new Block(560, 210),
    new Block(670, 210),
    new Block(780, 210),
    new Block(10, 300),
    new Block(120, 300),
    new Block(230, 300),
    new Block(340, 300),
    new Block(450, 300),
    new Block(560, 300),
    new Block(670, 300),
    new Block(780, 300),
    new Block(10, 330),
    new Block(120, 330),
    new Block(230, 330),
    new Block(340, 330),
    new Block(450, 330),
    new Block(560, 330),
    new Block(670, 330),
    new Block(780, 330),
    new Block(10, 360),
    new Block(120, 360),
    new Block(230, 360),
    new Block(340, 360),
    new Block(450, 360),
    new Block(560, 360),
    new Block(670, 360),
    new Block(780, 360),
    new Block(10, 390),
    new Block(120, 390),
    new Block(230, 390),
    new Block(340, 390),
    new Block(450, 390),
    new Block(560, 390),
    new Block(670, 390),
    new Block(780, 390),
    new Block(10, 420),

    new Block(120, 420),
    new Block(230, 420),
    new Block(340, 420),
    new Block(450, 420),
    new Block(560, 420),
    new Block(670, 420),
    new Block(780, 420),
    new Block(10, 450),
    new Block(120, 450),
    new Block(230, 450),
    new Block(340, 450),
    new Block(450, 450),
    new Block(560, 450),
    new Block(670, 450),
    new Block(780, 450),
    new Block(10, 478),
    new Block(120, 478),
    new Block(230, 478),
    new Block(340, 478),
    new Block(450, 478),
    new Block(560, 478),
    new Block(670, 478),
    new Block(780, 478),



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
                currentPosition[0] -= 10
                drawUser()
            }


            break;

        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10
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
    chechForCollisions()
}
timerid = setInterval(moveBall, 30)
// check for colission
function chechForCollisions() {
    // check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1 < blocks[1].topLeft])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()


        }
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
