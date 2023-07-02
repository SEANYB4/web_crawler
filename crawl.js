const url = require('url');
const { JSDOM } = require('jsdom');

const normalizeURL = (urlString) => {

    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath;
    
};

const getURLsFromHTML = (htmlString, rootURL) => {
    urls = []
    dom = new JSDOM(htmlString);
    // Doesn't seem to be getting the anchor tags
    const anchorTags = dom.window.document.querySelectorAll('a');
    // anchorTags.array.forEach(element => {
    //     urls.append(element.href)
    // });
    console.log(anchorTags);

}


module.exports = {
    normalizeURL,
    getURLsFromHTML
}