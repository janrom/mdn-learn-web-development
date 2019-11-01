// setup canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight

const ballCountPara = document.querySelector('p')
ballCountPara.style.visibility = 'hidden'
const startGameHeading = document.querySelector('h2')
const scores = document.getElementById('scores')
const scoresPara = document.querySelector('#scores p')

function random (min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min
  return num
}

function Shape (x, y, velX, velY, exists) {
  this.x = x
  this.y = y
  this.velX = velX
  this.velY = velY
  this.exists = exists
}

function Ball (x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists)
  this.color = color
  this.size = size
}

function EvilCircle (x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists)
  this.color = color
  this.size = size
}

Ball.prototype.draw = function () {
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.fill()
}

Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX)
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX)
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY)
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY)
  }

  this.x += this.velX
  this.y += this.velY
}

Ball.prototype.collisionDetect = function () {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j]) && balls[j].exists) {
      const dx = this.x - balls[j].x
      const dy = this.y - balls[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ', ' + random(0, 255) + ', ' + random(0, 255) + ')'
      }
    }
  }
}

EvilCircle.prototype.draw = function () {
  ctx.beginPath()
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 3
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.stroke()
}

EvilCircle.prototype.checkBounds = function () {
  if ((this.x + this.size) >= width) {
    this.x -= this.velX
  }

  if ((this.x - this.size) <= 0) {
    this.x += this.velX
  }

  if ((this.y + this.size) >= height) {
    this.y -= this.velY
  }

  if ((this.y - this.size) <= 0) {
    this.y += this.velY
  }
}

EvilCircle.prototype.setControls = function () {
  const _this = this
  window.onkeydown = function (e) {
    if (e.keyCode === 37) {
      _this.x -= 20
    } else if (e.keyCode === 39) {
      _this.x += 20
    } else if (e.keyCode === 38) {
      _this.y -= 20
    } else if (e.keyCode === 40) {
      _this.y += 20
    } else if (e.keyCode === 32) {
      toggleGameState()
    }
  }
}

EvilCircle.prototype.collisionDetect = function () {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      const dx = this.x - balls[j].x
      const dy = this.y - balls[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < (this.size + balls[j].size)) {
        balls[j].exists = false
        updateBallCount(--ballCount)
      }
    }
  }
}

// init NPCs and player

let balls = []
let ballCount = 0

const evilCircle = new EvilCircle(
  10,
  10,
  1,
  1,
  true,
  'white',
  10
)
evilCircle.setControls()

function createBalls (max) {
  balls = []
  while (balls.length < max) {
    const size = random(10, 20)
    const ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-5, 5),
      random(-5, 5),
      true,
      'rgb(' + random(0, 255) + ', ' + random(0, 255) + ', ' + random(0, 255) + ')',
      size
    )

    balls.push(ball)
    updateBallCount(++ballCount)
  }
}

// animation loop

let requestId
let isPlaying = false

function loop () {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.fillRect(0, 0, width, height)

  if (!isPlaying) {
    requestId = requestAnimationFrame(loop)
    return
  }

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw()
      balls[i].update()
      balls[i].collisionDetect()
    }
  }

  evilCircle.draw()
  evilCircle.checkBounds()
  evilCircle.collisionDetect()

  requestId = requestAnimationFrame(loop)
}

// game state controls
let startTime = 0

function updateBallCount (newCount) {
  ballCount = newCount

  if (ballCount === 0) {
    stopGame()
  } else {
    ballCountPara.textContent = 'Ball count: ' + ballCount
  }
}

function startGame () {
  isPlaying = true
  if (ballCount === 0) {
    createBalls(10)
  }
  startTime = Math.floor(Date.now())
  loop()
  ballCountPara.style.visibility = 'visible'
  startGameHeading.style.visibility = 'hidden'
  scores.style.display = 'none'
}

function stopGame () {
  isPlaying = false
  cancelAnimationFrame(requestId)
  ballCountPara.style.visibility = 'hidden'

  if (ballCount === 0) {
    scoresPara.textContent = 'You\'re time is ' + ((Math.floor(Date.now()) - startTime) / 1000) + ' seconds!'
    scores.style.display = 'block'
  }
  startGameHeading.style.visibility = 'visible'
}

function toggleGameState () {
  if (!isPlaying) {
    startGame()
  } else {
    stopGame()
  }
}
