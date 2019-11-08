const api = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'

// ADD API KEY
let key
let pageNum = 0

const articles = document.querySelector('#articles')
const submitBtn = document.querySelector('#submit')
const beginDateSelector = document.querySelector('#begin-date')
const endDateSelector = document.querySelector('#end-date')
const sortByNewest = document.querySelector('#newest')
const sortByOldest = document.querySelector('#oldest')
const sortByRelevance = document.querySelector('#relevance')
const spinner = document.querySelector('#spinner')
const nextPage = document.querySelector('#nextPage')
const prevPage = document.querySelector('#prevPage')

window.addEventListener('DOMContentLoaded', (event) => {
  hideSpinner()
  hidePageBrowseButtons()

  beginDateSelector.setAttribute('value', formBeginDateString('-'))
  endDateSelector.setAttribute('value', formEndDateString('-'))
})

submitBtn.addEventListener('click', function (event) {
  event.preventDefault()

  removeArticles()
  showSpinner()
  hidePageBrowseButtons()
  fetchData()
})

nextPage.addEventListener('click', function () {
  pageNum++

  removeArticles()
  showSpinner()
  hidePageBrowseButtons()
  fetchData()
})

prevPage.addEventListener('click', function () {
  pageNum--

  if (pageNum < 0) {
    pageNum = 0
  }

  removeArticles()
  showSpinner()
  hidePageBrowseButtons()
  fetchData()
})

function formBeginDateString (separator) {
  let beginDateValue
  if (beginDateSelector.value) {
    beginDateValue = new Date(beginDateSelector.value)
  } else {
    const now = new Date(Date.now())
    beginDateValue = now.setDate(now.getDate() - 7)
  }

  const dateString = formDateString(beginDateValue, separator)
  return dateString
}

function formEndDateString (separator) {
  let endDateValue
  if (endDateSelector.value) {
    endDateValue = new Date(endDateSelector.value)
  } else {
    endDateValue = new Date(Date.now())
  }

  return formDateString(endDateValue, separator)
}

function formDateString (dateValue, separator) {
  const date = new Date(dateValue)
  const year = date.getFullYear()

  let month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }

  let dayOfMonth = date.getDate()
  if (dayOfMonth < 10) {
    dayOfMonth = '0' + dayOfMonth
  }

  let dateString
  if (separator) {
    dateString = year + separator + month + separator + dayOfMonth
  } else {
    dateString = year + '' + month + '' + dayOfMonth
  }

  return dateString
}

function getSortValue () {
  let sortValue
  if (sortByRelevance.checked) {
    sortValue = sortByRelevance.value
  } else if (sortByOldest.checked) {
    sortValue = sortByOldest.value
  } else {
    sortValue = sortByNewest.value
  }

  return sortValue
}

function fetchData () {
  const query = document.querySelector('#search').value
  const url = api + '?q=' + query + '&api-key=' + key + '&begin_date=' + formBeginDateString() + '&end_date=' + formEndDateString() + '&sort=' + getSortValue() + '&page=' + pageNum
  console.log(url)

  window.fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)

      hideSpinner()
      showPageBrowseButtons()

      if (json.status === 'OK' && json.response.docs.length > 0) {
        displayArticles(json.response.docs)

        const copyright = document.querySelector('#copyright')
        copyright.textContent = json.copyright
      } else {
        console.log(json.status)
        json.errors.forEach(error => console.log(error))

        const article = document.createElement('div')
        article.className = 'article'
        article.textContent = 'Unable to retrive articles. Please try again later.'
        articles.appendChild(article)
      }
    })
    .catch(console.log)
}

function removeArticles () {
  while (articles.hasChildNodes()) {
    articles.removeChild(articles.lastChild)
  }
}

function displayArticles (docs) {
  docs.forEach(doc => {
    const article = document.createElement('div')
    const content = document.createElement('div')
    const multimedia = document.createElement('div')

    const headline = document.createElement('h2')
    const pubDate = document.createElement('p')
    const abstract = document.createElement('p')
    const webUrlHolder = document.createElement('p')
    const webUrl = document.createElement('a')
    const thumbnail = document.createElement('img')

    headline.textContent = doc.headline.main
    abstract.textContent = doc.abstract

    const date = new Date(doc.pub_date)
    pubDate.textContent = date.toLocaleString()
    pubDate.style.fontStyle = 'italic'

    if (doc.multimedia.length > 0) {
      for (const media of doc.multimedia) {
        if (media.subType === 'thumbLarge') {
          thumbnail.setAttribute('src', 'https://nytimes.com/' + media.url)
          thumbnail.setAttribute('alt', 'Article\'s thumbnail')
          break
        }
      }
    }

    webUrl.textContent = 'Read article'
    webUrl.setAttribute('href', doc.web_url)
    webUrl.setAttribute('target', '_blank')
    webUrl.setAttribute('rel', 'noreferrer')
    webUrlHolder.appendChild(webUrl)

    content.appendChild(headline)
    content.appendChild(pubDate)
    content.appendChild(abstract)
    content.appendChild(webUrlHolder)
    multimedia.appendChild(thumbnail)
    article.appendChild(content)
    article.appendChild(multimedia)

    article.className = 'article'

    articles.appendChild(article)
  })
}

function showSpinner () {
  spinner.className = 'spinner'
}

function hideSpinner () {
  spinner.className = 'hide'
}

function showPageBrowseButtons () {
  nextPage.className = ''
  nextPage.disabled = false
  prevPage.className = ''
  if (pageNum > 0) {
    prevPage.disabled = false
  } else {
    prevPage.disabled = true
  }
}

function hidePageBrowseButtons () {
  nextPage.className = 'hide'
  nextPage.disabled = true
  prevPage.className = 'hide'
  prevPage.disabled = true
}
