const canvas = document.querySelector('#canvas')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

// background
ctx.fillStyle = 'rgb(0, 0, 0)'
ctx.fillRect(0, 0, width, height)

// outer wall
ctx.strokeStyle = 'rgb(255, 255, 255)'
ctx.beginPath()
ctx.moveTo(50, 50)
ctx.lineTo(550, 50)
ctx.lineTo(550, 550)
ctx.lineTo(50, 550)
ctx.lineTo(50, 50)
ctx.stroke()

// inner walls

ctx.strokeStyle = 'rgb(255, 255, 255)'
ctx.beginPath()
ctx.moveTo(150, 150)
ctx.lineTo(450, 150)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(150, 250)
ctx.lineTo(250, 250)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(350, 250)
ctx.lineTo(450, 250)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(150, 350)
ctx.lineTo(250, 350)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(350, 350)
ctx.lineTo(450, 350)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(150, 450)
ctx.lineTo(450, 450)
ctx.stroke()

// points
ctx.fillStyle = 'rgb(255, 255, 255)'
for (let y = 100; y < 550; y += 100) {
  for (let x = 100; x < 550; x += 100) {
    ctx.beginPath()
    ctx.arc(x, y, 5, degToRad(0), degToRad(360), false)
    ctx.fill()
  }
}

// pacman
ctx.fillStyle = 'yellow'
ctx.beginPath()
ctx.arc(100, 100, 30, degToRad(-45), degToRad(45), true)
ctx.lineTo(100, 100)
ctx.fill()
ctx.fillStyle = 'rgb(0, 0, 0)'
ctx.beginPath()
ctx.arc(105, 85, 5, degToRad(0), degToRad(360), false)
ctx.fill()

// monster
ctx.fillStyle = 'purple'
ctx.beginPath()
ctx.arc(300, 100, 30, degToRad(0), degToRad(180), true)
ctx.lineTo(270, 130)
ctx.lineTo(280, 120)
ctx.lineTo(290, 130)
ctx.lineTo(300, 120)
ctx.lineTo(310, 130)
ctx.lineTo(320, 120)
ctx.lineTo(330, 130)
ctx.lineTo(330, 100)
ctx.fill()
ctx.fillStyle = 'red'
ctx.beginPath()
ctx.arc(290, 90, 5, degToRad(0), degToRad(360), false)
ctx.fill()
ctx.beginPath()
ctx.arc(310, 90, 5, degToRad(0), degToRad(360), false)
ctx.fill()

// game title
ctx.fillStyle = 'red'
ctx.font = '48px georgia'
ctx.fillText('Pacman', 630, 350)

// Image by OpenClipart-Vectors: https://pixabay.com/users/openclipart-vectors-30363/
const image = new window.Image()
image.src = 'pacman_scaled.png'
image.onload = () => {
  ctx.drawImage(image, 600, 50)
}

function degToRad (degrees) {
  return degrees * Math.PI / 180
}
