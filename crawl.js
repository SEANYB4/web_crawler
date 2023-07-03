const url = require('url');
const { JSDOM } = require('jsdom');
const { link } = require('fs');



const crawlPage = async (baseURL, currentURL, pages) => {

    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log(`actively crawling: ${currentURL}`);

    try {
        const resp = await fetch(currentURL);
        // we are expecting the response body to be formatted as HTML string, not as JSON
        
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`);
            return pages
        }

        const contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page ${currentURL}`);
            return pages
        }

        const htmlBody = await resp.text();
        nextURLs = getURLsFromHTML(htmlBody, baseURL);

        for (const nextUrl of nextURLs) {
            pages = await crawlPage(baseURL, nextUrl, pages);
        }

        


    } catch (error) {
        console.log(`error in fetch: ${error.message} on page ${currentURL}`);
    }

    return pages;
    
    
}

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
    getURLsFromHTML,
    crawlPage
}