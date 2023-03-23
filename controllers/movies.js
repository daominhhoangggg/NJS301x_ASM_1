const Movie = require("../models/movie");
const Genre = require("../models/genre");

const paging = (movies, page, cb) => {
  const totalPage = Math.ceil(movies.length / 16);
  const result = movies.slice((page - 1) * 16, 16 * page);
  cb(result, totalPage);
};

//Movies
exports.getTrending = (req, res, next) => {
  let page = req.query.page;
  if (!page) {
    page = 1;
  } else {
    page = +page;
  }
  Movie.fetchAll((movies) => {
    movies.sort((a, b) => b.popularity - a.popularity);
    paging(movies, page, (trending, totalPage) => {
      res.render("movies/trending", {
        movies: trending,
        pageTitle: "Trending",
        path: "/movies/trending",
        baseUrl: "https://image.tmdb.org/t/p/w200",
        page: page,
        totalPage: totalPage,
      });
    });
  });
};

exports.getTopRate = (req, res, next) => {
  let page = req.query.page;
  if (!page) {
    page = 1;
  } else {
    page = +page;
  }
  Movie.fetchAll((movies) => {
    movies.sort((a, b) => b.vote_average - a.vote_average);
    paging(movies, page, (topRate, totalPage) => {
      res.render("movies/trending", {
        movies: topRate,
        pageTitle: "Top Rate",
        path: "/movies/top-rate",
        baseUrl: "https://image.tmdb.org/t/p/w200",
        page: page,
        totalPage: totalPage,
      });
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

exports.getResult = (req, res, next) => {
  const genreId = req.params.genreId;
  let page = req.query.page;
  if (!page) {
    page = 1;
  } else {
    page = +page;
  }
  Movie.findByGenre(genreId, (movies) => {
    paging(movies, page, (discover, totalPage) => {
      res.render("movies/trending", {
        movies: discover,
        pageTitle: "Discover",
        path: `/movies/discover/${genreId}`,
        baseUrl: "https://image.tmdb.org/t/p/w200",
        page: page,
        totalPage: totalPage,
      });
    });
  });
};

//Video
