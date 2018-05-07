const request = require('request');
const cheerio = require('cheerio');

const getDataFromUrl = (url, callback) => {
    request({
        url: `https://${url}`
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, body);
        } else {
            callback('unable to fetch data');
        }
    });
};

const parseBody = (body, tag) => {
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
