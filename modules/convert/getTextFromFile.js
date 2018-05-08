const fs = require('fs');
const extractSrt = require('srt-to-obj');
const extractPdf = require('pdf-text-extract');
const extractImg = require('tesseractocr');
const fileType = require('file-type');

const getTextFromFile = (appRoot, file, callback) => {
    let directory = `${appRoot}/public/sources`;
    let filePath = `${directory}/${file}`;



    fs.readFile(filePath, (error, data) => {

      if (!error) {
        let filetype = fileType(data);

        console.log(`convert ${file} \n`);

        if (filetype === null) {
            extractSrt(filePath).then( function(srtData){
              let tab = [];
              for (let key in srtData) {
                tab.push(srtData[key].text);
              }
              let res = tab.join();
              callback(undefined, res);
          }).catch( (err) => {if (err) callback('unable to process the file');});

        } else if (filetype.mime === 'application/pdf') {
            extractPdf(filePath, { splitPages: false }, (err, text) => {
              if (err) {
                callback('unable to process the file');
              } else {
                callback(undefined,text.toString());
              }
            });

        } else if (filetype.mime === 'image/jpeg') {
            extractImg(filePath, (err, text) => {
              if (err) {
                callback('unable to process the file');
              } else {
                callback(undefined,text.toString());
              }
            });

        } else {
          console.log('no file type');
        }

      } else {
        callback('unable to read the file');
      }

    });
};

module.exports = {
  getTextFromFile
};
