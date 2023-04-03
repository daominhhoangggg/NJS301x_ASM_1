const Movie = require("../models/movie");
const Genre = require("../models/genre");
const Video = require("../models/video");

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
      const data = {
        results: [...trending],
        page: page,
        total_pages: totalPage,
      };
      res.status(200).json(data);
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
      const data = {
        results: [...topRate],
        page: page,
        total_pages: totalPage,
      };
      res.status(200).json(data);
    });
  });
};

exports.getLatest = (req, res, next) => {
  let page = req.query.page;
  if (!page) {
    page = 1;
  } else {
    page = +page;
  }
  Movie.fetchAll((movies) => {
    let today = new Date();
    let recentMovies = movies.filter(
      (movie) => new Date(movie.release_date) <= today
    );
    recentMovies.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
    paging(recentMovies, page, (latest, totalPage) => {
      const data = {
        results: [...latest],
        page: page,
        total_pages: totalPage,
        total_results: recentMovies.length,
      };
      res.status(200).json(data);
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
  const genreId = req.query.genreId;
  if (!genreId) {
    res.send({ message: "Not found genre parram" });
  } else {
    let page = req.query.page;
    if (!page) {
      page = 1;
    } else {
      page = +page;
    }
    Movie.findByGenre(genreId, (movies, genreName) => {
      if (!genreId) {
        res.send({ message: "Not found that genre id" });
      } else {
        paging(movies, page, (discover, totalPage) => {
          const data = {
            results: [...discover],
            page: page,
            total_pages: totalPage,
            genre_name: genreName,
          };
          res.status(200).json(data);
        });
      }
    });
  }
};

//Video
exports.postMovietrailer = (req, res, next) => {
  const movieId = req.body.movieId;
  if (!movieId) {
    res.status(400).send({ message: "Not found film_id parram" });
  } else {
    Video.fetchTrailer(+movieId, (trailers) => {
      if (trailers.videos.length === 0) {
        res.status(404).json({ message: "Not found video" });
      } else {
        //Get Trailer
        let trailer = trailers.videos.filter((video) => {
          return (
            video.site === "YouTube" &&
            video.official &&
            video.type === "Trailer"
          );
        });

        //If no trailer, get teaser
        if (Object.values(trailer).length === 0) {
          trailer = trailers.videos.filter((video) => {
            return (
              video.site === "YouTube" &&
              video.official &&
              video.type === "Teaser"
            );
          });
        }

        //Sort latest
        trailer.sort((a, b) => {
          const dateA = new Date(a.published_at);
          const dateB = new Date(b.published_at);
          return dateB - dateA;
        });

        //Response
        const data = {
          id: movieId,
          video: trailer[0],
        };
        res.status(200).json(data);
      }
    });
  }
};

exports.postSearch = (req, res, next) => {
  const keyword = req.body.query;
  let page = req.query.page;
  if (!page) {
    page = 1;
  } else {
    page = +page;
  }
  if (keyword) {
    Movie.search(keyword, (movies) => {
      paging(movies, page, (movies, totalPage) => {
        const data = {
          page: page,
          results: [...movies],
          total_pages: totalPage,
        };
        res.status(200).json(data);
      });
    });
  } else {
    res.status(400).json({ message: "Not found keyword parram" });
  }
};
