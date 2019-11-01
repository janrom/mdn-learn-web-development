let testOnClickEvent = () => {
  let divs = document.querySelectorAll('div')

  for (let i = 0; i < divs.length; i++) {
    divs[i].onclick = (e) => {
      e.target.style.backgroundColor = 'green'
    }
  }
}
testOnClickEvent()

let testPreventDefaultEvent = () => {
  let form = document.querySelector('form')
  let firstName = document.getElementById('fname')
  let lastName = document.getElementById('lname')

  form.onsubmit = (e) => {
    // catch strings with multiple whitespaces
    if (firstName.value.trim().length === 0 || lastName.value.trim().length === 0) {
      e.preventDefault()
      console.log('prevent default')      

      console.log('firstName typeof: ' + typeof(firstName))
      console.log('firstname value: ' + firstName.value)
      console.log('firstname value length: ' + firstName.value.length)
      
      console.log('lastName typeof: ' + typeof(lastName))
      console.log('lastname value: ' + lastName.value)
      console.log('lastname value length: ' + lastName.value.length)      
    }    
  }
}
testPreventDefaultEvent()