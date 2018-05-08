const request = require('request');
const cheerio = require('cheerio');

const getDataFromUrl = (url, callback) => {
    console.log(`scrap from url ${url}\n`);
    request({
        url: `https://${url}`
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, body);
        } else {
            callback(error, 'Sorry!, unable to fetch data, please check error log \n');
        }
    });
};

const parseBody = (body, tag) => {
    console.log(`get text from ${tag} done! Results in corpus\n`);
    const $ = cheerio.load(body);
    const text = [];
    $(tag).each(function(i) {
        text[i] = $(this).text();
    });
    return text.join(', ');
};

module.exports = {
    getDataFromUrl,
    parseBody
};
