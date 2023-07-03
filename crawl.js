const url = require('url');
const { JSDOM } = require('jsdom');
const { link } = require('fs');

const normalizeURL = (urlString) => {

    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath;
    
};

const getURLsFromHTML = (htmlBody, baseURL) => {
    urls = []
    dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    linkElements.forEach(element => {
        if (element.href.slice(0, 1) === '/') {
            //relative
            try {
                const urlObj = new URL(`${baseURL}${element.href}`)
                urls.push(baseURL + element.href)
            } catch (err) {
                console.log(err.message);
            }
            
        } else {
            // absolute
            try {
                const urlObj = new URL(element.href)
                urls.push(element.href)
            } catch (err) {
                console.log(err.message);
            }
        }
    });
    return urls;

}


module.exports = {
    normalizeURL,
    getURLsFromHTML
}