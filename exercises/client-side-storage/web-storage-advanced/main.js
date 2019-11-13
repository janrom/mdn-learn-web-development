const colorInput = document.querySelector('#bgcolor')
const fontSelect = document.querySelector('#font')
const wrapperHeader = document.querySelector('.wrapper > h1')
const wrapperPara = document.querySelector('.wrapper > p')
const wrapperForm = document.querySelector('.wrapper > form')
const imageSelect = document.querySelector('#image')
const imageElem = document.querySelector('.wrapper img')

const colorKey = 'color'
const fontKey = 'font'
const imageKey = 'image'

window.addEventListener('DOMContentLoaded', setPageStyle)

function setPageStyle () {
  let color
  let font
  let image

  if (storageAvailable('localStorage')) {
    if (window.localStorage.getItem(colorKey)) {
      color = '#' + window.localStorage.getItem(colorKey)
    }
    if (window.localStorage.getItem(fontKey)) {
      font = window.localStorage.getItem(fontKey)
    }
    if (window.localStorage.getItem(imageKey)) {
      image = window.localStorage.getItem(imageKey)
    }
  }

  if (!color) {
    color = '#' + colorInput.value
  }
  if (!font) {
    font = fontSelect.value
  }
  if (!image) {
    image = imageSelect.value
  }

  document.body.style.backgroundColor = color
  colorInput.setAttribute('value', color)
  colorInput.jscolor.fromString(color)

  fontSelect.value = font
  wrapperHeader.style.fontFamily = font
  wrapperPara.style.fontFamily = font
  wrapperForm.style.fontFamily = font

  imageElem.src = image
  imageSelect.value = image
}

// see: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
function storageAvailable (type) {
  try {
    const storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

colorInput.addEventListener('change', (event) => {
  document.body.style.backgroundColor = '#' + event.target.value

  window.localStorage.setItem(colorKey, event.target.value)
})

fontSelect.addEventListener('input', (event) => {
  wrapperHeader.style.fontFamily = event.target.value
  wrapperPara.style.fontFamily = event.target.value
  wrapperForm.style.fontFamily = event.target.value

  window.localStorage.setItem(fontKey, event.target.value)
})

imageSelect.addEventListener('input', (event) => {
  imageElem.src = event.target.value

  window.localStorage.setItem(imageKey, event.target.value)
})
