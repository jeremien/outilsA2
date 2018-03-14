const srt = require('srt-to-obj');
const fs = require('fs');
const modules = require('./module_fonctions');
const moment = require('moment');

let date = moment().format('DD_MM_YY');

srt('./sources/BladeRunner.srt').then( function(srtData){

  let tab = [];

  for (let key in srtData) {
    tab.push(srtData[key].text);
  }

  let res = tab.join();
  res = modules.nettoyageTexte(res);
  console.log(res)
  modules.ecrire_texte(res, `./corpus/${date}-sub.txt`);

});
