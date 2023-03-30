const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authorizeController = require("./controllers/auth");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const moviesRoutes = require("./routes/movies");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/movies", authorizeController.getToken);
app.use("/api/movies", moviesRoutes);

app.use(errorController.get404);

app.listen(5000);
