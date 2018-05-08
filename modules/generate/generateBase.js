const fs = require('fs');
const combined = require('combined-stream');
const Rita = require('rita');
const _ = require('underscore');
const filter = require('filter-values');
// TODO remplacer filter > braces vulnerable 
const jsonfile = require('jsonfile');
const moment = require('moment');

const tools = require('../utils/tools');

let date = moment().format('DD_MM_YY');

const generateCorpus = (appRoot, callback) => {
    let directory = `${appRoot}/public/corpus`;

    console.log(`generate corpus\n`);

    fs.readdir(directory, (error, files) => {
        if (!error && files.length !== 0) {
            let flux = combined.create();
            files.forEach(function(file) {
                flux.append(fs.createReadStream(`${directory}/${file}`));
            });
            flux.pipe(fs.createWriteStream(`${directory}/corpus.tmp`));
            callback(undefined,`file corpus.tmp created in ${directory}\n`);
        } else {
            callback('unable to parse file');
        }
    });
};

const filtreObj = (objet, pos) => {
    let res = filter(objet, pos);
    res = _.keys(res);
    return res;
};

const generateBase = (appRoot, callback) => {

    let directory = `${appRoot}/public/corpus`;
    let directoryBdd = `${appRoot}/public/bdd`;

    console.log(`generate database\n`);

    let sentence = fs.readFileSync(`${directoryBdd}/sentence.tmp`,'utf8');

    fs.readFile(`${directory}/corpus.tmp`, (error, data) => {

        if (!error) {

            let text = tools.nettoyageTexte(data.toString());

            const rita_string = Rita.RiString(text);
            const posTag = rita_string.pos();
            const words = rita_string.words();
            let obj = {};
            _.each(words, function(k, i){
                obj[k] = posTag[i];
            });

            // POS
            let cc = filtreObj(obj, 'cc');
            let cd = filtreObj(obj, 'cd');
            let dt = filtreObj(obj, 'dt');
            let ex = filtreObj(obj, 'ex');
            let fw = filtreObj(obj, 'fw');
            let iN = filtreObj(obj, 'in');
            let jj = filtreObj(obj, 'jj');
            let jjr = filtreObj(obj, 'jjr');
            let jjs = filtreObj(obj, 'jjs');
            let ls = filtreObj(obj, 'ls');
            let md = filtreObj(obj, 'md');
            let nn = filtreObj(obj, 'nn');
            let nns = filtreObj(obj, 'nns');
            let nnp = filtreObj(obj, 'nnp');
            let nnps = filtreObj(obj, 'nnps');
            let pdt = filtreObj(obj, 'pdt');
            let pos = filtreObj(obj, 'pos');
            let prp = filtreObj(obj, 'prp');
            let prp$ = filtreObj(obj, 'prp$');
            let rb = filtreObj(obj, 'rb');
            let rbr = filtreObj(obj, 'rbr');
            let rbs = filtreObj(obj, 'rbs');
            let rp = filtreObj(obj, 'rp');
            let sym = filtreObj(obj, 'sym');
            let to = filtreObj(obj, 'to');
            let uh = filtreObj(obj, 'uh');
            let vb = filtreObj(obj, 'vb');
            let vbd = filtreObj(obj, 'vbd');
            let vbg = filtreObj(obj, 'vbg');
            let vbn = filtreObj(obj, 'vbn');
            let vbp = filtreObj(obj, 'vbp');
            let vbz = filtreObj(obj, 'vbz');
            let wdt = filtreObj(obj, 'wdt');
            let wp = filtreObj(obj, 'wp');
            let wp$ = filtreObj(obj, 'wp$');
            let wrb = filtreObj(obj, 'wrb');

            let bdd = {
                "sentence": [sentence],
                "cc": cc,
                "cd": cd,
                "dt": dt,
                "ex" : ex,
                "fw" : fw,
                "iN" : iN,
                "jj" : jj,
                "jjr" : jjr,
                "jjs" : jjs,
                "ls" : ls,
                "md" : md,
                "nn" : nn,
                "nns" : nns,
                "nnp" : nnp,
                "nnps" : nnps,
                "pdt" : pdt,
                "poS" : pos,
                "prp" : prp,
                "prp$" : prp$,
                "rb" : rb,
                "rbr" : rbr,
                "rbs" : rbs,
                "rp" : rp,
                "sym" : sym,
                "to" : to,
                "uh" : uh,
                "vb" : vb,
                "vbd" : vbd,
                "vbg" : vbg,
                "vbn" : vbn,
                "vbp" : vbp,
                "vbz" : vbz,
                "wdt" : wdt,
                "wp" : wp,
                "wp$" : wp$,
                "wrb" : wrb
            };

            jsonfile.writeFile(`${directoryBdd}/${date}-bdd.json`, bdd, function(err) {
                if (!err) {
                    callback(undefined,`file ${date}-bdd.json created in ${directoryBdd}\n`);
                    console.log(`file corpus.tmp destroyed\n`);
                    fs.unlinkSync(`${directory}/corpus.tmp`);
                } else {
                  callback('unable to generate base', err);
                }
            });

        } else {
            callback('unable to parse file');
        }
    });
};

module.exports = {
    generateCorpus,
    generateBase
};
