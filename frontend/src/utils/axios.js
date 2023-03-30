import axios from "axios";

/** base url to make request to the themoviedatabase */

const instance = axios.create({
  baseURL: "http://localhost:5000/api/movies",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "ACcess-Origin-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

// instance.get('/foo-bar');
// https://api.themoviedb.org/3/foo-bar
// http://localhost:5000/api/movies/video?token=8qlOkxz4wq&movieId=361743

export default instance;
