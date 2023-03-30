const fs = require("fs");
const path = require("path");

const Genre = require("./genre");

const getFromFile = (file, cb) => {
  const p = path.join(path.dirname(process.mainModule.filename), "data", file);
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
    getFromFile("movieList.json", cb);
  }

  static search(keyword, cb) {
    if (keyword) {
      getFromFile("movieList.json", (movies) => {
        const content = movies.filter((movie) => {
          return (
            movie.title.toLowerCase().includes(keyword.toLowerCase()) ||
            movie.overview.toLowerCase().includes(keyword.toLowerCase())
          );
        });
        cb(content);
      });
    }
  }

  static findByGenre(genreId, cb) {
    Genre.fetchGenre((genre) => {
      const selectedGenre = genre.find((g) => g.id === +genreId);
      if (selectedGenre) {
        getFromFile("movieList.json", (movies) => {
          const result = movies.filter((movie) => {
            return movie.genre_ids.indexOf(selectedGenre.id) !== -1;
          });
          cb(result, selectedGenre.name);
        });
      } else {
        cb([], null);
      }
    });
  }

  static findById(id, cb) {
    getFromFile("movieList.json", (movies) => {
      const movie = movies.find((m) => m.id === id);
      cb(movie);
    });
  }
};
