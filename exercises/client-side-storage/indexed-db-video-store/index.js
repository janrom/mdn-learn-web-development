let db
const dbName = 'video_store_db'
const osName = 'video_store_os'
const videos = [
  { name: 'crystal' },
  { name: 'elf' },
  { name: 'frog' },
  { name: 'monster' },
  { name: 'pig' },
  { name: 'rabbit' }
]

window.onload = init()

function init () {
  if (!window.indexedDB) {
    window.alert('Please update your browser to support IndexedDB.')
    return
  }

  initDatabase()
}

function initDatabase () {
  const openDBRequest = window.indexedDB.open(dbName, 4)

  openDBRequest.onsuccess = (event) => {
    db = event.target.result

    getVideos()

    // error events bubble from database requests to database object
    db.onerror = (event) => {
      console.log(event.target.error)
    }
  }

  openDBRequest.onerror = (event) => {
    event.stopPropagation()
    console.log(event.target.error)
  }

  openDBRequest.onupgradeneeded = (event) => {
    const db = event.target.result

    if (db.objectStoreNames.contains(osName)) {
      db.deleteObjectStore(osName)
    }

    const objectStore = db.createObjectStore(osName, { keyPath: 'name' })
    objectStore.createIndex('mp4', 'mp4', { unique: false })
    objectStore.createIndex('webm', 'webm', { unique: false })
  }
}

function getVideos () {
  const objectStore = db.transaction([osName], 'readonly').objectStore(osName)

  videos.forEach(video => {
    const request = objectStore.get(video.name)

    request.onsuccess = (event) => {
      if (event.target.result) {
        console.log('Display video from client database.')
        const result = event.target.result
        displayVideo(result.mp4, result.webm, result.name)
      } else {
        console.log('Load video from server.')
        loadVideoFromServer(video.name)
      }
    }

    request.onerror = (event) => {
      event.stopPropagation()
      console.log(event.target.error)
    }
  })
}

function displayVideo (mp4Blob, webmBlob, name) {
  const video = document.createElement('video')
  video.src = URL.createObjectURL(mp4Blob)
  video.src = URL.createObjectURL(webmBlob)
  video.setAttribute('type', 'video/mp4')
  video.setAttribute('controls', true)

  const heading = document.createElement('h2')
  heading.textContent = name

  const section = document.querySelector('main > section')
  section.appendChild(heading)
  section.appendChild(video)
}

function loadVideoFromServer (name) {
  const mp4Blob = window.fetch('videos/' + name + '.mp4')
    .then(result => result.blob())

  const webmBlob = window.fetch('videos/' + name + '.webm')
    .then(result => result.blob())

  Promise.all([mp4Blob, webmBlob])
    .then(blobs => storeVideoToClient(blobs[0], blobs[1], name))
}

function storeVideoToClient (mp4Blob, webmBlob, name) {
  const transaction = db.transaction(osName, 'readwrite')
  const objectStore = transaction.objectStore(osName)

  const record = {
    name: name,
    mp4: mp4Blob,
    webm: webmBlob
  }

  const request = objectStore.add(record)

  request.onsuccess = (event) => {
    displayVideo(mp4Blob, webmBlob, name)
  }

  request.onerror = (event) => {
    event.stopPropagation()
    console.log(event.target.error)
  }
}
