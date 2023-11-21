const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')


test('normalizeURL strip protocol', () => {
    const input = 'https://subdomain.domain.com/path'
    const output = normalizeURL(input)
    const expected = 'subdomain.domain.com/path'
    expect(output).toEqual(expected)
})


test('normalizeURL strip trailing slash', () => {
    const input = 'https://subdomain.domain.com/path/'
    const output = normalizeURL(input)
    const expected = 'subdomain.domain.com/path'
    expect(output).toEqual(expected)
})


test('normalizeURL capitals', () => {
    const input = 'https://SUBDOMAIN.domain.com/path'
    const output = normalizeURL(input)
    const expected = 'subdomain.domain.com/path'
    expect(output).toEqual(expected)
})


test('normalizeURL strip http', () => {
    const input = 'http://subdomain.domain.com/path/'
    const output = normalizeURL(input)
    const expected = 'subdomain.domain.com/path'
    expect(output).toEqual(expected)
})


test('getURLsFromHTML', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="http://subdomain.domain.com/path/">
            dev blog
        </a>
    </body>
</html>
    `
    const inputBaseUrl = 'http://subdomain.domain.com'
    const output = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ['http://subdomain.domain.com/path/']
    expect(output).toEqual(expected)
})


test('normalizeURL strip http', () => {
    const input = 'http://subdomain.domain.com/path/'
    const output = normalizeURL(input)
    const expected = 'subdomain.domain.com/path'
    expect(output).toEqual(expected)
})


test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            dev blog relative
        </a>
    </body>
</html>
    `
    const inputBaseUrl = 'http://subdomain.domain.com'
    const output = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ['http://subdomain.domain.com/path/']
    expect(output).toEqual(expected)
})


test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="http://subdomain.domain.com/path1/">
            dev blog
        </a>
        <a href="/path2/">
            dev blog relative
        </a>
    </body>
</html>
    `
    const inputBaseUrl = 'http://subdomain.domain.com'
    const output = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = [
        'http://subdomain.domain.com/path1/',
        'http://subdomain.domain.com/path2/',
    ]
    expect(output).toEqual(expected)
})


test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="path">
            dev blog relative
        </a>
    </body>
</html>
    `
    const inputBaseUrl = 'http://subdomain.domain.com'
    const output = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(output).toEqual(expected)
})