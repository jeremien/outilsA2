const GoogleNewsRss = require('google-news-rss');
const wtf = require('wtf_wikipedia');
const Twit = require('twit');

const twitter = new Twit({

    consumer_key: '0zeGnMiQaYsg56XbTiCrDo73Z',
    consumer_secret: 'cU9bmitcE9Sor46GOtFUVa2zCXe1yvT8eqh140RtaZ2rJCRXBI',
    access_token: '976063483-1T5RbOGBOdmxUDtChp8WAevIIyXuC7pbL52gOmwv',
    access_token_secret: 'qX4RhvZfZjIHvLauNdNaYWreaFTbKJEnEzEewX5vORsCT'

});


const getTextFromApi = (tag, callback) => {

    const data = [];

    const news = new GoogleNewsRss();

    news.search(tag).then(function(reponse) {

        for (let identifiant in reponse) {
            data.push(`${reponse[identifiant].description}\n`);
        }

        wtf.from_api(tag, 'en', function(reponse) {
            let res = wtf.plaintext(reponse);
            data.push(`${res}`);

            twitter.get('search/tweets', {
                q: tag,
                count: 100,
                language: 'en'
            },
            function(err, reponse){
                if (err) {
                    console.log(err);
                }
                for (let key in reponse.statuses) {
                    data.push(`${reponse.statuses[key].text}\n`);
                }

                let str = data.join(', ');
                callback(undefined, str);
            });


        });


    }).catch((err) => {
        callback('unable to fetch data', err);
    });


};

module.exports = {
    getTextFromApi
};
