// const API_KEY = "504b85f6fe0a10a9c7f35945e14e7ddf";
const USER_TOKEN = "8qlOkxz4wq";

const requests = {
  fetchTrending: `/trending?token=${USER_TOKEN}`,
  fetchNetflixOriginals: `/latest?token=${USER_TOKEN}`,
  fetchTopRated: `/top-rate?token=${USER_TOKEN}`,
  fetchActionMovies: `/discover?token=${USER_TOKEN}&genreId=28`,
  fetchComedyMovies: `/discover?token=${USER_TOKEN}&genreId=35`,
  fetchHorrorMovies: `/discover?token=${USER_TOKEN}&genreId=27`,
  fetchRomanceMovies: `/discover?token=${USER_TOKEN}&genreId=10749`,
  fetchDocumentaries: `/discover?token=${USER_TOKEN}&genreId=99`,
  fetchSearch: `/search?token=${USER_TOKEN}`,
  fetchTrailer: `/video?token=${USER_TOKEN}`,
};

export default requests;
