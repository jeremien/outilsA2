const yargs = require('yargs');
const moment = require('moment');
const path = require('path');

const getTextFromUrl = require('./modules/textmining/getTextFromUrl');
const getTextFromApi = require('./modules/textmining/getTextFromApi');
const getSubFromYoutube = require('./modules/textmining/getSubFromYoutube');

const analyse = require('./modules/analyse/getPosfromTxt');
const translate = require('./modules/utils/translate');
const convert = require('./modules/convert/getTextFromFile');

const get = require('./modules/analyse/getListFiles.js');

const generate = require('./modules/generate/generateBase');
const generateTalk = require('./modules/generate/generateTalk');


const tools = require('./modules/utils/tools');

const print = require('./modules/print/genTxtToPdf');

const appRoot = path.resolve(__dirname);

let date = moment().format('DDMMYY');

console.log(`
***********************************************************
  Ghost in the Machine - ${date} - v. 1.0.0 - 08/05/2018
***********************************************************
`);

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
    dir: {
        describe: 'path to the directory',
        demand: false,
        alias: 'd'
    },
    file: {
        describe: 'path to the file',
        demand: true,
        alias: 'f'
    },
    ext: {
      describe: 'file extension',
      demand:false,
      alias: 'e'
    }
};

const argv = yargs
    .command('scrap', 'scrap text from website url using tag (html, class, id) --> ./corpus', {
        url: options.url,
        tag: options.tag
    })
    .command('search', 'search on api (google news, twitter, wikipedia) --> ./corpus', {
        tag: options.tag
    })
    .command('extract', 'extract subtitles from youtube', {
        url: options.url
    })
    .command('convert', 'convert file to text (jpg, pdf, srt) <-- ./sources', {
        file: options.file
    })
    .command('analyse', 'analyse text and get the POS <-- ./sources, generate the base sentence --> ./bdd', {
        file: options.file
    })
    .command('generate', 'generate the database --> ./bdd from a folder full of texts <-- ./corpus')
    .command('talk', 'generate the talk from the database and the sentence <-- ./bdd --> ./resultats', {
        file: options.file
    })
    .command('translate', 'translate from a language to another <-- ./resultats ', {
        file: options.file
    })
    .command('print', 'generate a pdf from the text result file <-- ---> ./resultats', {
        file: options.file
    })
    .command('list', 'list all work files in the application, in a directory and with file extension', {
        dir: options.dir,
        ext: options.ext
    })
    .help()
    .argv;

let command = argv._[0];

if (command === 'scrap') {

    getTextFromUrl.getDataFromUrl(argv.url, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            let text = getTextFromUrl.parseBody(res, argv.tag);
            tools.ecrireTexte(text, `${appRoot}/public/corpus/${date}-${argv.url}-${argv.tag}.txt`);
        }
    });
} else if (command === 'search') {

    getTextFromApi.getTextFromApi(argv.tag, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            tools.ecrireTexte(res, `${appRoot}/public/corpus/${date}-api-${argv.tag}.txt`);
        }
    });

} else if (command === 'extract') {

    getSubFromYoutube.getSubFromYoutube(appRoot, argv.url, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });


} else if (command === 'convert') {

    convert.getTextFromFile(appRoot, argv.file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`done! results save in corpus\n`);
        tools.ecrireTexte(res, `${appRoot}/public/corpus/${date}-convert-${argv.file}.txt`);
      }
    });

} else if (command === 'analyse') {

    analyse.getPosFromTxt(appRoot, argv.file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${res.analyse} \n\n ${res.resultat}\n log save in analyse, sentence.tmp save in bdd \n`);
        tools.ecrireTexte(res.analyse, `${appRoot}/public/analyse/${date}-log-${argv.file}`);
        tools.ecrireTexte(res.resultat, `${appRoot}/public/bdd/sentence.tmp`);
      }
    });

} else if (command === 'generate') {

    generate.generateCorpus(appRoot, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);

            generate.generateBase(appRoot, (err, res) => {
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
            tools.ecrireTexte(`${res}`, `${appRoot}/public/resultats/${date}-talk.txt`);
        }
    });

} else if (command === 'translate') {

    translate.getTranslate(appRoot, argv.file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${res} \n\n *** file save in resultats *** \n`);
        // tools.ecrireTexte(`${res}`, `${appRoot}/public/resultats/${date}-talk-fr.txt`);
      }
    });

} else if (command === 'print') {

    print.genTxtToPdf(appRoot, argv.file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });

} else if (command === 'list') {

  get.getListFiles(appRoot, argv.dir, argv.ext, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });

} else {
    console.log(`please, try again\n`);
}
