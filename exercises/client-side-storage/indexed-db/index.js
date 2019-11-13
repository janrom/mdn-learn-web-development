// Create needed constants
const list = document.querySelector('ul')
const titleInput = document.querySelector('#title')
const bodyInput = document.querySelector('#body')
const form = document.querySelector('form')

let db

window.onload = () => {
  const request = window.indexedDB.open('notes_db', 1)

  request.onerror = () => {
    console.log('Datatase failed to open.')
  }

  request.onsuccess = () => {
    console.log('Database opened succesfully.')

    db = request.result

    displayData()
  }

  request.onupgradeneeded = (event) => {
    const db = event.target.result

    const objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement: true })

    objectStore.createIndex('title', 'title', { unique: false })
    objectStore.createIndex('body', 'body', { unique: false })

    console.log('Database setup complete')
  }

  form.onsubmit = addData

  function addData (event) {
    event.preventDefault()

    const newItem = { title: titleInput.value, body: bodyInput.value }
    const transaction = db.transaction(['notes_os'], 'readwrite')
    const objectStore = transaction.objectStore('notes_os')
    const request = objectStore.add(newItem)

    request.onsuccess = () => {
      titleInput.value = ''
      bodyInput.value = ''
    }

    transaction.oncomplete = () => {
      console.log('Transaction completed: database modification finished.')

      displayData()
    }

    transaction.onerror = () => {
      console.log('Transaction not opened due to error.')
    }
  }

  function displayData () {
    while (list.firstChild) {
      list.removeChild(list.firstChild)
    }

    const objectStore = db.transaction('notes_os').objectStore('notes_os')
    const cursor = objectStore.openCursor()

    cursor.onsuccess = function (event) {
      const cursor = event.target.result

      if (cursor) {
        const listItem = document.createElement('li')
        const h3 = document.createElement('h3')
        const para = document.createElement('p')

        listItem.appendChild(h3)
        listItem.appendChild(para)
        list.appendChild(listItem)

        h3.textContent = cursor.value.title
        para.textContent = cursor.value.body

        listItem.setAttribute('data-node-id', cursor.value.id)

        const deleteBtn = document.createElement('button')
        listItem.appendChild(deleteBtn)
        deleteBtn.textContent = 'Delete'

        deleteBtn.onclick = deleteItem

        cursor.continue()
      } else {
        if (!list.firstChild) {
          const listItem = document.createElement('li')
          listItem.textContent = 'No notes stored.'
          list.appendChild(listItem)
        }

        console.log('Notes all displayed.')
      }
    }

    cursor.onerror = (err) => {
      console.log(err)
    }
  }

  function deleteItem (event) {
    const noteId = Number(event.target.parentNode.getAttribute('data-node-id'))

    const transaction = db.transaction(['notes_os'], 'readwrite')
    const objectStore = transaction.objectStore('notes_os')
    objectStore.delete(noteId)

    transaction.oncomplete = () => {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode)
      console.log('Note ' + noteId + ' deleted.')

      if (!list.firstChild) {
        const listItem = document.createElement('li')
        listItem.textContent = 'No notes stored.'
        list.appendChild(listItem)
      }
    }
  }
}
