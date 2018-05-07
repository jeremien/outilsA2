const fs = require('fs');
const traduire = require('google-translate-api');

const getGoogleTranslate = (appRoot, file, callback) => {

  fs.readFile(`${appRoot}/resultats/${file}`, (error, data) => {

    traduire(data.toString(), {from: 'en', to: 'fr'} )
      .then(res => {
       callback(undefined, res.text);
    }).catch(err => {
      callback('unable to process the file', err);
    });

  });
  //

};

module.exports = {
  getGoogleTranslate
};
