const { test, expect, toEqual } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')


// TESTS FOR NORMALIZE URL FUNCTION
test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL remove trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})


test('normalizeURL remove capitals', () => {
    const input = 'https://BLOG.boot.dev/path';
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

// TESTS FOR GETURLS FROM HTML FUNCTION
test('get URLS from HTML absolute', () => {
    const inputHTMLBody = `<html>
                        <body>
                            <a href="https://blog.boot.dev/">
                                Boot.dev Blog
                            </a>
                        </body>
                    </html>`;
    const inputBaseURL = 'https://blog.boot.dev/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/'];
    expect(actual).toEqual(expected);

})

// relative URL just includes a path

test('get URLS from HTML both absolute and relative', () => {
    const inputHTMLBody = `<html>
                        <body>
                            <a href="https://blog.boot.dev/path1/">
                                Boot.dev Blog
                            </a>
                            <a href="/path2/">
                                Boot.dev Blog
                            </a>
                            
                        </body>
                    </html>`;
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/'];
    expect(actual).toEqual(expected);

})


test('get URLS from HTML both', () => {
    const inputHTMLBody = `<html>
                        <body>
                            <a href="/path/">
                                Boot.dev Blog
                            </a>
                        </body>
                    </html>`;
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);

})


test('get URLS from HTML invalid', () => {
    const inputHTMLBody = `<html>
                        <body>
                            <a href="invalid">
                                Boot.dev Blog
                            </a>
                        </body>
                    </html>`;
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);

})