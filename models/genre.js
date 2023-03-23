const fs = require("fs");
const path = require("path");

const getFromFile = (cb, file) => {
  const p = path.join(path.dirname(process.mainModule.filename), "data", file);
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Genre {
  static fetchGenre(cb) {
    getFromFile(cb, "genreList.json");
  }

  static fetchTrailer(cb) {
    getFromFile(cb, "videoList.json");
  }
};
