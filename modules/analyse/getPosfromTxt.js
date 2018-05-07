const Rita = require('rita');
const fs = require('fs');
const _ = require('underscore');

const getPosFromTxt = (appRoot,file, callback) => {

  fs.readFile(`${appRoot}/sources/${file}`, (error, data) => {
    if (!error) {
        const rita_string = Rita.RiString(data.toString());
        const features = rita_string.features();

        let tokens = features.tokens.split(' ');
        let tag = features.pos.split(' ');

        let res = _.map(tokens, (t, i) => {
          return `${t} (${tag[i]}) `;
        });

        res = res.join('');

        let resBase = _.map(tokens, (t, i) => {
          return `#${tag[i]}# `;
        });

        resBase = resBase.join('');
        resBase = resBase.replace(/#[.,!%&;:{}=\-_`~()'"”“'?…]#/gm, '/');
        resBase = resBase.replace(/#in#/gm,'#iN#');

        let obj = {
          analyse: res,
          resultat: resBase
        };

        callback(undefined, obj);

    } else {
      callback('unable to read file');
    }
  });

};

module.exports = {
  getPosFromTxt
};
