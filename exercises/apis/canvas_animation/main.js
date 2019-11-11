const canvas = document.querySelector('.myCanvas')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'rgb(0,0,0)'
ctx.fillRect(0, 0, width, height)

// move zero point at the center of canvas
ctx.translate(width / 2, height / 2)

const image = new window.Image()
image.src = 'walk-right.png'
image.onload = draw

let sprite = 0
let posX = 0
const centerX = width / 2
const centerY = height / 2
const spriteWidth = 102
const spriteHeight = 148
const frameDivider = 20

function draw () {
  ctx.fillRect(-(centerX), -(centerY), width, height)
  ctx.drawImage(image, (sprite * spriteWidth), 0, spriteWidth, spriteHeight, 0 + posX, -(spriteHeight / 2), spriteWidth, spriteHeight)

  // change sprite's frame
  if (posX % frameDivider === 0) { // controls speed of frame change
    if (sprite === 5) {
      sprite = 0
    } else {
      sprite++
    }
  }

  // move sprite
  if (posX > width / 2) {
    const newStartPos = -(centerX + spriteWidth)
    posX = Math.ceil(newStartPos / frameDivider) * frameDivider // move sprite off the screen and make sure frame is still changing (remainder of division can be integer of zero)
  } else {
    posX += 2
  }

  window.requestAnimationFrame(draw)
}
