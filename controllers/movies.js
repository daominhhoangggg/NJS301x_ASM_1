const Movie = require("../models/movie");
const Genre = require("../models/genre");

//Movies
exports.getAll = (req, res, next) => {
  Movie.fetchAll((movies) => {
    res.render("movies/trending", {
      movies: movies,
      pageTitle: "All Movies",
      path: "/movies/all",
      baseUrl: "https://image.tmdb.org/t/p/w200",
    });
  });
};

exports.getTrending = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const trending = [...movies];
    trending.sort((a, b) => b.popularity - a.popularity);
    res.render("movies/trending", {
      movies: trending,
      pageTitle: "Trending Movies",
      path: "/movies/trending",
      baseUrl: "https://image.tmdb.org/t/p/w200",
    });
  });
};

exports.getTopRate = (req, res, next) => {
  Movie.fetchAll((movies) => {
    const topRate = [...movies];
    topRate.sort((a, b) => b.vote_average - a.vote_average);
    res.render("movies/trending", {
      movies: topRate,
      pageTitle: "Top Rate Movies",
      path: "/movies/top-rate",
      baseUrl: "https://image.tmdb.org/t/p/w200",
    });
  });
};

//Discover

exports.getDiscover = (req, res, next) => {
  Genre.fetchGenre((genres) => {
    res.render("movies/discover", {
      genres: genres,
      pageTitle: "Discover",
      path: "/movies/discover",
    });
  });
};

exports.postDiscover = (req, res, next) => {
  const genreName = req.body.genreName;
  Movie.findByGenre(genreName, (movies) => {
    Movie.save(movies);
    res.redirect("/api/movies/genre");
  });
};

exports.getGenre = (req, res, next) => {
  Movie.fetchResult((movies) => {
    res.render("movies/trending", {
      movies: movies,
      pageTitle: "Discover",
      path: "/movies/discover",
      baseUrl: "https://image.tmdb.org/t/p/w200",
    });
  });
};
