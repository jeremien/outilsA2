const fs = require('fs');
const PDFDocument = require('pdfkit');


const genPdf = (font, doc, str) => {

  doc.addPage()
     .font(font)
     .fillColor('black')
     .fontSize(15)
     .text(str, 50, 50);

};

const genTxtToPdf = (appRoot, file, callback) => {

  const options = require(`${appRoot}/public/printConfig`);

  let font = `${appRoot}/public/fonts/${options.font}`;

  const doc = new PDFDocument(options.options);

  console.log(`*** generate pdf from ${file} ***

    with the options :
    font : ${options.font}
    size : ${options.options.size}
    top : ${options.options.margins.top}
    bottom : ${options.options.margins.bottom}
    left : ${options.options.margins.left}
    right : ${options.options.margins.right}
    layout : ${options.options.layout}
    Title : ${options.options.info.Title}
    Author : ${options.options.info.Author}
    Creation Date : ${options.options.info.CreationDate}
     \n`);

  let text = fs.readFileSync(`${appRoot}/public/resultats/${file}`, 'utf-8');

  doc.pipe(fs.createWriteStream(`${appRoot}/public/resultats/${file}.pdf`));

  doc.rect(0,0,419.53,595.28)
     .fillAndStroke("black","black")
     .font(font)
     .fillColor('white')
     .fontSize(15)
     .text('hello', 50, 50);

  let lines = text.split('\n').filter(Boolean);


  for(let i = 0; i < lines.length; i++){
    genPdf(font, doc, lines[i]);
  }

  doc.end();

  callback(undefined, `*** the ${file} pdf is created *** \n`);

};

module.exports = {
  genTxtToPdf
};
