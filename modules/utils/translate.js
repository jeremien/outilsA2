
const fs = require('fs');
const traduire = require('google-translate-api');

const getTranslate = (appRoot, file, callback) => {

  console.log(`*** translate ${file} from english to french ***\n`);

  fs.readFile(`${appRoot}/public/resultats/${file}`, (error, data) => {
    const str = data.toString();
    traduire(str, {to:'fr'} )
      .then(res => {
        // console.log(res);
       callback(undefined, res.text);
    }).catch(err => {
      callback(err);

    });
  });
};

module.exports = {
  getTranslate
};
