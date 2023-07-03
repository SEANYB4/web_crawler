const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main() {

    if (process.argv.length < 3) {
        console.log('No website provided');
        process.exit(1)
    }

    if (process.argv.length > 3) {
        console.log('Too many command line arguments');
        process.exit(1);
    }

    for (let arg of process.argv) {
        console.log(arg)
    }

    const baseURL = process.argv[2]
    console.log(`starting web crawl of ${baseURL}`);

    // crawl pages returns a promise so we need to wait until that resolves
    const pages = await crawlPage(baseURL, baseURL, {});

    // make an object iterable
    // for (const page of Object.entries(pages)) {
    //     console.log(page);
    // }

    printReport(pages);
}


main()