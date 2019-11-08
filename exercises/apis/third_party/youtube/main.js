const searchInput = document.querySelector('#searchInput')
const channel = document.querySelector('#channel')
const playlist = document.querySelector('#playlist')
const video = document.querySelector('#video')
const submitBtn = document.querySelector('#submit')
const results = document.querySelector('#results')
const pageBrowse = document.querySelector('#pageBrowse')
const nextPage = document.querySelector('#nextPage')
const prevPage = document.querySelector('#prevPage')

// ADD API KEY
let apiKey
let pageToken
const maxResults = 3

window.addEventListener('DOMContentLoaded', initUI)

window.onload = handleClientLoad

function initUI () {
  pageBrowse.className = 'hide'
}

function handleClientLoad () {
  gapi.load('client', initClient)
}

function initClient () {
  return gapi.client.init({ apiKey: apiKey })
    .then(
      loadClientInterfaceForAPI(),
      err => console.log('Error on GAPI client initialization', err)
    )
}

function loadClientInterfaceForAPI () {
  gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
    .then(
      submitBtn.addEventListener('click', search),
      err => console.log('Error on Loading client interface for API', err)
    )
}

function search () {
  results.textContent = 'Loading videos...'

  gapi.client.youtube.search.list({
    part: 'snippet',
    type: getTypeString(),
    maxResults: maxResults,
    pageToken: getPageToken(),
    q: getQuery()
  }).then(
    response => {
      results.textContent = ''
      const list = document.createElement('ul')

      response.result.items.forEach((item) => {
        const title = document.createElement('h2')
        const thumb = document.createElement('img')
        const publishedAt = document.createElement('p')
        const player = document.createElement('iframe')
        const headerLeft = document.createElement('div')
        const headerRight = document.createElement('div')
        const playerHolder = document.createElement('div')
        const resultContainer = document.createElement('div')
        const listElem = document.createElement('li')

        title.textContent = item.snippet.title
        thumb.src = item.snippet.thumbnails.default.url
        thumb.alt = title.textContent
        const date = new Date(item.snippet.publishedAt)
        publishedAt.textContent = date.toLocaleString()

        headerLeft.className = 'headerLeft'
        headerLeft.appendChild(thumb)
        headerRight.className = 'headerRight'
        headerRight.appendChild(title)
        headerRight.appendChild(publishedAt)

        let id
        if (item.id.videoId) {
          id = item.id.videoId
        } else if (item.id.channelId) {
          id = item.id.channelId
        } else if (item.id.playlistId) {
          id = item.id.playlistId
        }
        player.src = 'https://www.youtube.com/embed/' + id + '?enablejsapi=1'
        player.setAttribute('width', '640')
        player.setAttribute('height', '360')

        playerHolder.className = 'playerHolder'
        playerHolder.appendChild(player)

        resultContainer.className = 'resultContainer'
        resultContainer.appendChild(headerLeft)
        resultContainer.appendChild(headerRight)
        resultContainer.appendChild(playerHolder)

        listElem.appendChild(resultContainer)

        list.appendChild(listElem)
      })
      results.appendChild(list)

      if (response.result.nextPageToken) {
        nextPage.value = response.result.nextPageToken
      }
      if (response.result.prevPageToken) {
        prevPage.value = response.result.prevPageToken
      }

      pageBrowse.className = 'pageBrowse'
    },
    err => console.log('Error on Youtube search list', err)
  )
}

function getTypeString () {
  let typeString = ''
  if (channel.checked) {
    typeString = channel.value
  }
  if (playlist.checked) {
    typeString += ',' + playlist.value
  }
  if (video.checked) {
    typeString += ',' + video.value
  }
  return typeString
}

function getPageToken () {
  if (pageToken) {
    return pageToken
  }
  return ''
}

function getQuery () {
  searchInput.value = searchInput.value.trim()
  return searchInput.value
}

nextPage.addEventListener('click', function () {
  pageToken = this.value
  hideUIElements()
  removeListElements()
  search()
})

prevPage.addEventListener('click', function () {
  pageToken = this.value
  hideUIElements()
  removeListElements()
  search()
})

function removeListElements () {
  while (results.firstChild) {
    results.removeChild(results.firstChild)
  }
}

function hideUIElements () {
  pageBrowse.className = 'hide'
}
