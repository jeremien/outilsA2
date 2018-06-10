const fs = require('fs');
const PDFDocument = require('pdfkit');


const genPdf = (font, size, doc, str) => {

    doc.addPage()
        .font(font)
        .fillColor('black')
        .fontSize(size)
        .text(str, 50, 50);

};

const genTxtToPdf = (appRoot, file, callback) => {

    const size = 11;

    const prenom = 'couverture';
    const fileDescription = 'couverture.txt';
    const description = fs.readFileSync(`${appRoot}/public/sources/textes/${prenom}/${fileDescription}`, 'utf-8');
    // const description2 = fs.readFileSync(`${appRoot}/public/sources/textes/${prenom}/description2.txt`, 'utf-8');

    const liste = fs.readFileSync(`${appRoot}/public/sources/textes/${prenom}/liste.txt`, 'utf-8');

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
     \n`);

    let text = fs.readFileSync(`${appRoot}/public/sources/textes/${prenom}/${file}`, 'utf-8');

    doc.pipe(fs.createWriteStream(`${appRoot}/public/resultats/${prenom}-${file}.pdf`));

    doc.rect(20, 20, 379.53, 555.28)
        .fillAndStroke("black", "black")
        .font(font)
        .fillColor('white')
        .fontSize(65)
        .text(description, 50, 50);

    // doc.addPage()
    //    .rect(20,20,379.53,555.28)
    //    .fillAndStroke("black","black")
    //    .font(font)
    //    .fillColor('white')
    //    .fontSize(size)
    //    .text(description2, 50, 50);

    // doc.addPage();
    //
    // doc.addPage()
    //    .font(font)
    //    .fillColor('black')
    //    .fontSize(size)
    //    .text(description, 50, 50);

    doc.addPage();

    let lines = text.split('#').filter(Boolean);

    for (let i = 0; i < lines.length; i++) {
        genPdf(font, size, doc, lines[i]);
    }

    doc.addPage();

    doc.addPage()
        .font(font)
        .fillColor('black')
        .fontSize(11)
        .text(liste, 50, 50);

    doc.addPage();

    doc.addPage()
        .image(`${appRoot}/public/sources/textes/${prenom}/image.jpg`, 50, 50, { scale: 0.285 });

    doc.addPage();

    doc.rect(20, 20, 379.53, 555.28)
        .fillAndStroke("black", "black");

    doc.end();

    callback(undefined, `*** the ${file} pdf is created *** \n`);

};

module.exports = {
    genTxtToPdf
};