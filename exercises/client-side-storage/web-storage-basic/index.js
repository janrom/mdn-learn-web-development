const rememberDiv = document.querySelector('.remember')
const forgetDiv = document.querySelector('.forget')
const form = document.querySelector('form')
const nameInput = document.querySelector('#entername')
const submitBtn = document.querySelector('#submitname')
const forgetBtn = document.querySelector('#forgetname')

const h1 = document.createElement('h1')
const personalGreeting = document.querySelector('.personal-greeting')

document.body.onload = nameDisplayCheck

form.addEventListener('submit', (e) => {
  e.preventDefault()
})

submitBtn.addEventListener('click', () => {
  window.localStorage.setItem('name', nameInput.value)
  nameDisplayCheck()
})

forgetBtn.addEventListener('click', () => {
  window.localStorage.removeItem('name')
  nameDisplayCheck()
})

function nameDisplayCheck () {
  if (storageAvailable('localStorage')) {
    if (window.localStorage.getItem('name')) {
      const name = window.localStorage.getItem('name')
      h1.textContent = 'Welcome ' + name
      personalGreeting.textContent = 'Welcome to our website, ' + name + '! We hope you have fun while you are here.'
      forgetDiv.style.display = 'block'
      rememberDiv.style.display = 'none'

      return
    }
  }

  h1.textContent = 'Welcome to our website'
  personalGreeting.textContent = 'Welcome to our website. We hope you have fun while you are here.'
  forgetDiv.style.display = 'none'
  rememberDiv.style.display = 'block'
}

function storageAvailable (type) {
  let storage
  try {
    storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (err) {
    return err instanceof window.DOMException && (
      // everyting except firefox
      err.code === 22 ||
      // firefox
      err.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      err.name === 'QuotaExceededError' ||
      err.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0)
  }
}
