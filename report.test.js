const { sortPages } = require('./report.js');
const { test, expect } = require(`@jest/globals`);

test('sortPages', () => {
    const input = {
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path': 1
    }
    const actual = sortPages(input);
    const expected = [['https://wagslane.dev', 3], ['https://wagslane.dev/path', 1]]
    expect(actual).toEqual(expected);
})


test('sort pages 5 pages', () => {
    const input = {
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev/path2': 50,
        'https://wagslane.dev/path3': 1,
        'https://wagslane.dev/path4': 6
    }

    const actual = sortPages(input);
    const expected = [['https://wagslane.dev/path2', 50], ['https://wagslane.dev/path4', 6], ['https://wagslane.dev', 3], ['https://wagslane.dev/path', 1], ['https://wagslane.dev/path3', 1]];
    expect(actual).toEqual(expected);
})