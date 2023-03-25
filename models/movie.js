const fs = require("fs");
const path = require("path");

const Genre = require("./genre");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "movieList.json"
);

const getMoviesFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      const movies = JSON.parse(fileContent, "utf8").filter(
        (movie) => movie.media_type === "movie"
      );
      cb(movies);
    }
  });
};

module.exports = class Movie {
  static fetchAll(cb) {
    getMoviesFromFile(cb);
  }

  static findByGenre(genreId, cb) {
    Genre.fetchGenre((genre) => {
      const selectedGenre = genre.find((g) => g.id === +genreId);
      if (selectedGenre) {
        getMoviesFromFile((movies) => {
          const result = movies.filter((movie) => {
            return movie.genre_ids.indexOf(selectedGenre.id) !== -1;
          });
          cb(result, selectedGenre.name);
        });
      }
    });
  }

  static findById(id, cb) {
    getMoviesFromFile((movies) => {
      const movie = movies.find((m) => m.id === id);
      cb(movie);
    });
  }
};
