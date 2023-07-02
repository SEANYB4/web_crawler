const { normalizeURL, getURLsFromHTML } = require('./crawl.js');


// console.log(normalizeURL('https://www.seanbain.com/projects'));


getURLsFromHTML('<a href="./projects">Projects</a>', 'https://seanbain.com');