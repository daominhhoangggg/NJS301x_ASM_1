const fs = require("fs");
const path = require("path");

const getFromFile = (file, cb) => {
  const p = path.join(path.dirname(process.mainModule.filename), "data", file);
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent, "utf8"));
    }
  });
};

module.exports = class Genre {
  static fetchGenre(cb) {
    getFromFile("genreList.json", cb);
  }

  static fetchTrailer(id, cb) {
    getFromFile("videoList.json", (videos) => {
      const trailers = videos.find((v) => v.id === id);
      cb(trailers);
    });
  }
};
