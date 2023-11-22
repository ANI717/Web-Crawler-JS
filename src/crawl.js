const {JSDOM} = require('jsdom')


async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObs = new URL(currentURL)

    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }
    pages[normalizedCurrentURL] = 1


    if (baseURLObj.hostname !== currentURLObs.hostname) {
        console.log(`${currentURL}: not in same domain`)
        return pages
    }

    console.log(`crawling "${currentURL}"`)
    try {
        const response = await fetch(currentURL)

        if (response.status > 399) {
            console.log(`${currentURL}: ${response.status}`)
            return pages
        }

        const contentType = response.headers.get("content-type")
        console.log(contentType)
        if (!contentType.includes("text/html")) {
            console.log(`${currentURL}: not HTML`)
            return pages
        }
        
        const htmlBody = await response.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)
        for(let nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    } catch(err) {
        console.log(`${currentURL}: ${err.message}`)
        return pages
    }
    return pages
}


function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (let linkElement of linkElements) {
        const hRef = linkElement.href
        if (hRef.slice(0,1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${hRef}`)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`Error with "${hRef}": ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(hRef)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`Error with "${hRef}": ${err.message}`)
            }
        }
    }
    return urls
}


function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    } else {
        return hostPath
    }

}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
