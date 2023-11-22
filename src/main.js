const {normalizeURL, getURLsFromHTML, crawlPage} = require('./crawl.js')

async function main() {
    if (process.argv.length < 3) {
        console.log('No website is provided for crawling')
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log('Too many command line args')
        process.exit(1)
    }

    const baseURL = process.argv[2]
    const pages = await crawlPage(baseURL, baseURL, {})
    console.log(pages)
}

main()
