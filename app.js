const yargs = require('yargs');
const moment = require('moment');
const path = require('path');

const getTextFromUrl = require('./modules/textmining/getTextFromUrl');
const getTextFromApi = require('./modules/textmining/getTextFromApi');

const generate = require('./modules/generate/generateBase');
const generateTalk = require('./modules/generate/generateTalk');

const analyse = require('./modules/analyse/getPosfromTxt');

const tools = require('./modules/utils/tools');
const translate = require('./modules/utils/translate');

let date = moment().format('DD_MM_YY');

const appRoot = path.resolve(__dirname);

const options = {
    url: {
        describe: 'url of the website',
        demand: true,
        alias: 'u'
    },
    tag: {
        describe: 'tag to use',
        demand: true,
        alias: 't'
    },
    folder: {
        describe: 'path to the folder',
        demand: true,
        alias: 'p'
    },
    file: {
        describe: 'path to the file',
        demand: true,
        alias: 'f'
    }
};

const argv = yargs
    .command('scrap', 'scrap text from website url using tag (html, class, id)', {
        url: options.url,
        tag: options.tag
    })
    .command('search', 'search on api (google news, twitter, wikipedia)', {
        tag: options.tag
    })
    .command('analyse', 'analyse text and get the POS', {
        file: options.file
    })
    .command('generate', 'generate the database from a folder full of texts', {
        folder: options.folder
    })
    .command('talk', 'generate the talk from the database', {
        file: options.file
    })
    .command('translate', 'translate from a language to another', {
        file: options.file
    })
    .help()
    .argv;

let command = argv._[0];

if (command === 'scrap') {

    getTextFromUrl.getDataFromUrl(argv.url, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            let texte = getTextFromUrl.parseBody(res, argv.tag);
            let resultat = tools.nettoyageTexte(texte);
            tools.ecrireTexte(resultat, `./corpus/${date}-${argv.url}-${argv.tag}.txt`);
        }
    });
} else if (command === 'search') {

    getTextFromApi.getTextFromApi(argv.tag, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            let resultat = tools.nettoyageTexte(res);
            tools.ecrireTexte(resultat, `./corpus/${date}-api-${argv.tag}.txt`);
        }
    });

} else if (command === 'convert') {
    // TODO test l'extension du fichier jpg/srt/pdf
    console.log('convert');

} else if (command === 'analyse') {

    analyse.getPosFromTxt(appRoot, argv.file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res.analyse, res.resultat);
        tools.ecrireTexte(res.analyse, `./analyse/${date}-analyse-${argv.file}`);
        tools.ecrireTexte(res.resultat, `./bdd/sentence.tmp`);
      }
    });

} else if (command === 'generate') {

    generate.generateCorpus(appRoot, argv.folder, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            generate.generateBase(appRoot, argv.folder, (err, res) => {
                if (!err) {
                    console.log(res);
                }
            });
        }
    });

} else if (command === 'talk') {

    generateTalk.generateTalk(appRoot, argv.file, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            tools.ecrireTexte(`${res}`, `./resultats/${date}-talk.txt`);
        }
    });

} else if (command === 'translate') {

    translate.getGoogleTranslate( appRoot, argv.file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        tools.ecrireTexte(`${res}`, `./resultats/${date}-talk-fr.txt`);
      }
    });

} else if (command === 'print') {
    // TODO genere un pdf à partir du texte
    console.log('print');

} else {
    console.log('please, try again');
}
