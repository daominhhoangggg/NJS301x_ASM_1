const fs = require("fs");
const path = require("path");

const Genre = require("./genre");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);

const r = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "result.json"
);

const getMoviesFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      const movies = JSON.parse(fileContent).filter(
        (movie) => movie.media_type === "movie"
      );
      cb(movies);
    }
  });
};

const getResult = (cb) => {
  fs.readFile(r, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      const result = JSON.parse(fileContent);
      cb(result);
    }
  });
};

const saveResult = (result) => {
  const res = [...result];
  fs.writeFile(r, JSON.stringify(res), (err) => {
    console.log(err);
  });
};

module.exports = class Movie {
  static fetchAll(cb) {
    getMoviesFromFile(cb);
  }

  static fetchResult(cb) {
    getResult(cb);
  }

  static save(m) {
    saveResult(m);
  }

  static findByGenre(genreName, cb) {
    Genre.fetchGenre((genre) => {
      const selectedGenre = genre.find((g) => g.name === genreName);
      getMoviesFromFile((movies) => {
        const result = movies.filter((movie) =>
          movie.genre_ids.includes(selectedGenre.id)
        );
        cb(result);
      });
    });
  }
};
