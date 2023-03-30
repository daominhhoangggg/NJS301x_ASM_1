const path = require("path");

const express = require("express");

const moviesController = require("../controllers/movies");

const router = express.Router();

router.get("/latest", moviesController.getLatest);

router.get("/trending", moviesController.getTrending);

router.get("/top-rate", moviesController.getTopRate);

router.get("/discover/:genreId", moviesController.getResult);

router.get("/discover", moviesController.getResult);

router.post("/video", moviesController.postMovietrailer);

router.post("/search", moviesController.postSearch);

module.exports = router;
