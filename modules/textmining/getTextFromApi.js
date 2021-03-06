const GoogleNewsRss = require('google-news-rss');
const wtf = require('wtf_wikipedia');
const Twit = require('twit');

const twitter = new Twit({

    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''

});


const getTextFromApi = (tag, callback) => {

    console.log(`searching ${tag} on google news, wikipedia and twitter\n`);

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
                console.log(`done! Results for ${tag} in corpus\n`);
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
