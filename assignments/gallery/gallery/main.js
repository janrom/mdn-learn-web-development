const displayedImage = document.querySelector('.displayed-img')
const thumbBar = document.querySelector('.thumb-bar')

const btn = document.querySelector('button')
const overlay = document.querySelector('.overlay')

const setDisplayedImage = (e) => {
  displayedImage.setAttribute('src', e.target.src)
}

/* Looping through images */
for (let i = 1; i <= 5; i++) {
  const newImage = document.createElement('img')
  const path = 'images/pic' + i + '.jpg'
  newImage.setAttribute('src', path)
  newImage.addEventListener('click', setDisplayedImage)
  thumbBar.appendChild(newImage)
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', (e) => {
  const className = btn.getAttribute('class')
  console.log(className)
  if (className === 'dark') {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    btn.setAttribute('class', 'light')
    btn.textContent = 'Lighten'
  } else {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    btn.setAttribute('class', 'dark')
    btn.textContent = 'Darken'
  }
})
