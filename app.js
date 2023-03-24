const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const moviesRoutes = require("./routes/movies");
const homeRoutes = require("./routes/home");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", moviesRoutes);
app.use(homeRoutes);

app.use(errorController.get404);

app.listen(5000);
