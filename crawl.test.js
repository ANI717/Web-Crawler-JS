const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')


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
    const input = 'http://subdomain.domain.com/path'
    const output = normalizeURL(input)
    const expected = 'subdomain.domain.com/path'
    expect(output).toEqual(expected)
})