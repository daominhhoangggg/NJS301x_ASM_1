const Movie = require("../models/movie");

//Home
exports.getHome = (req, res, next) => {
  res.render("movies/nothing", {
    pageTitle: "Home",
    path: "/",
  });
};
