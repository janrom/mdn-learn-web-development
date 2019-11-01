/**********************
* Update player name:
**********************/
const para = document.querySelector('p')
const text = 'Player 1:'

const updateName = () => {
  const name = window.prompt('Enter a new name')
  para.textContent = text + ' ' + name
}

para.addEventListener('click', updateName)

/**********************
* Add new paragraph:
**********************/
const addParagraph = () => {
  const newPara = document.createElement('p')
  newPara.textContent = 'New paragraph'

  const paraContainer = document.createElement('div')
  paraContainer.appendChild(newPara)

  const paragraphs = document.querySelector('#paragraphs')
  paragraphs.appendChild(paraContainer)
}

const buttons = document.querySelectorAll('button')
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', addParagraph)
}
