const path = require("path");

const express = require("express");

const moviesController = require("../controllers/movies");

const router = express.Router();

router.get("/movies/trending", moviesController.getTrending);

router.get("/movies/top-rate", moviesController.getTopRate);

router.get("/movies/discover/:genreId", moviesController.getResult);

router.get("/movies/discover", moviesController.getResult);

router.get("/movies/video");

module.exports = router;
