const fs = require('fs');
const youtubedl = require('youtube-dl');
const vtt = require('vtt-to-srt');

const getSubFromYoutube = (appRoot,url, callback) => {

  console.log(`extract sub from ${url}\n`);

  const options = {
    auto: true,
    all: false,
    lang: 'en',
    cwd: `${appRoot}/public/sources/`
  };

  youtubedl.getSubs(url, options, function(err, files) {
    if (err) {
      callback(err);
    } else {

      console.log(`tmp file ${files[0]} created \n`);

      fs.createReadStream(`${appRoot}/public/sources/${files[0]}`)
        .pipe(vtt())
        .pipe(fs.createWriteStream(`${appRoot}/public/sources/${files[0]}.srt`));

      console.log(`tmp file ${files[0]} deleted \n`);

      fs.unlinkSync(`${appRoot}/public/sources/${files[0]}`);
      callback(undefined, `subtitle ${files[0]}.srt created\n`);
    }
  });
};

module.exports = {
  getSubFromYoutube
};
