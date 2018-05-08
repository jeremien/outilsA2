const glob = require('glob');

const getListFiles = (appRoot, dir, ext, callback) => {

  const options = {
    cwd: '/',
    root: `${appRoot}/public`,
    nonull: true,
    nodir: false,
    realpath: false,
    nosort: true
  };

  if (dir === undefined && ext === undefined) {
    glob(`/*`, options, (error, files) => {

        if (!error) {
          callback(undefined, files);
        } else {
          callback('no files found');
        }

    });

  } else if (dir !== undefined && ext === undefined) {
    glob(`/${dir}/*`, options, (error, files) => {

        if (!error) {
          callback(undefined, files);
        } else {
          callback('no files found');
        }
    });
  } else {
    glob(`/${dir}/*${ext}`, options, (error, files) => {

        if (!error) {
          callback(undefined, files);
        } else {
          callback('no files found');
        }
    });
  }
};

module.exports = {
  getListFiles
};
