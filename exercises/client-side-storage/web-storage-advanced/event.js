const myKey = document.querySelector('.my-key')
const myOld = document.querySelector('.my-old')
const myNew = document.querySelector('.my-new')
const myUrl = document.querySelector('.my-url')
const myStorage = document.querySelector('.my-storage')

window.addEventListener('storage', (event) => {
  console.log(event)

  myKey.textContent = event.key
  myOld.textContent = event.oldValue
  myNew.textContent = event.newValue
  myUrl.textContent = event.url
  myStorage.textContent = JSON.stringify(event.storageArea)

  if (event.key === 'color') {
    document.body.style.backgroundColor = '#' + event.newValue
  }
})
