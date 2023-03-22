//Home
exports.home = (req, res, next) => {
  res.render("movies/nothing", {
    pageTitle: "Home",
    path: "/",
  });
};
