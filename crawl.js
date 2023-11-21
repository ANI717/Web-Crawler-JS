const {JSDOM} = require('jsdom')


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
    getURLsFromHTML
}
