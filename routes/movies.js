const path = require("path");

const express = require("express");

const moviesController = require("../controllers/movies");

const router = express.Router();

router.get('/movies/all', moviesController.getAll);

router.get("/movies/trending", moviesController.getTrending);

router.get("/movies/top-rate", moviesController.getTopRate);

router.get("/movies/discover", moviesController.getDiscover);

router.post("/movies/genre", moviesController.postDiscover);

router.get("/movies/genre", moviesController.getGenre);

module.exports = router;
